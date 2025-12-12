"use client";

import React, { useEffect, useRef, useState } from "react";




const SIGNALING_SERVER_URL = "wss://YOUR-SIGNALING-SERVER.example/ws"; // <-- replace will bedone later on.
const DEFAULT_ROOM = "diabetic-retinopathy-room";

type SignalMessage =
  | { type: "join"; room: string }
  | { type: "offer"; sdp: RTCSessionDescriptionInit }
  | { type: "answer"; sdp: RTCSessionDescriptionInit }
  | { type: "ice"; candidate: RTCIceCandidateInit }
  | { type: "leave" };

export default function VideoCallFrontEnd({
  room = DEFAULT_ROOM,
  suggestedWidth = 1280,
}: {
  room?: string;
  suggestedWidth?: number;
}) {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const [connected, setConnected] = useState(false);
  const [isCaller, setIsCaller] = useState(false);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [sharingScreen, setSharingScreen] = useState(false);
  const [status, setStatus] = useState("idle");
  const [iceCount, setIceCount] = useState(0);
  const [rttMs, setRttMs] = useState<number | null>(null);

  
  const btnClass =
    "px-3 py-2 rounded-2xl shadow-md font-medium transform hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2";

  useEffect(() => {
    return () => {
      cleanup();
    };
    
  }, []);

  async function startLocalMedia() {
    try {
      setStatus("getting-media");
      const constraints: MediaStreamConstraints = {
        audio: { echoCancellation: true, noiseSuppression: true },
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setStatus("media-ready");
      return stream;
    } catch (err) {
      console.error("getUserMedia failed", err);
      setStatus("media-error");
      throw err;
    }
  }

  function createPeerConnection() {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
       
      ],
    });

    pc.onicecandidate = (ev) => {
      if (ev.candidate && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        const msg: SignalMessage = { type: "ice", candidate: ev.candidate.toJSON() };
        wsRef.current.send(JSON.stringify(msg));
        setIceCount((c) => c + 1);
      }
    };

    pc.ontrack = (ev) => {
      
      if (remoteVideoRef.current) {
    
        const [track] = ev.streams.length ? ev.streams : ev.track ? [ev.track] : [];
        if (track) remoteVideoRef.current.srcObject = ev.streams[0];
      }
    };

    pc.onconnectionstatechange = () => {
      const s = pc.connectionState;
      setStatus(s);
      
      if (s === "connected") setConnected(true);

      if (s === "disconnected" || s === "failed" || s === "closed") setConnected(false);
    };

    
    setInterval(async () => {
      if (!pc) return;
      try {
        const stats = await pc.getStats();
        stats.forEach((report) => {
          if (report.type === "candidate-pair" && (report as any).currentRoundTripTime != null) {
            const rtt = (report as any).currentRoundTripTime * 1000; 
            setRttMs(Math.round(rtt));
          }
        });
      } catch (e) {
        
      }
    }, 3000);

    
    (async () => {
      await new Promise((r) => setTimeout(r, 2000));
      try {
        const senders = pc.getSenders();
        senders.forEach(async (s) => {
          try {
            
            const params = s.getParameters();
            if (!params.encodings) params.encodings = [{}];
            params.encodings.forEach((enc) => {
              
              (enc as any).maxBitrate = 1200_000; 
            });
            await s.setParameters(params);
          } catch (e) {
            
          }
        });
      } catch (e) {
       
      }
    })();

    pcRef.current = pc;
    return pc;
  }

  async function join() {
    setStatus("connecting-signaling");
    try {
      await startLocalMedia();
    } catch (e) {
      return;
    }

    const ws = new WebSocket(SIGNALING_SERVER_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WS open, joining room:", room);
      ws.send(JSON.stringify({ type: "join", room }));
      setStatus("joined-signaling");
    };

    ws.onmessage = async (evt) => {
      try {
        const data = JSON.parse(evt.data) as SignalMessage;
        if (data.type === "offer") {
          console.log("Got offer");
          setIsCaller(false);
          const pc = createPeerConnection();
          // attach local tracks
          localStreamRef.current?.getTracks().forEach((t) => pc.addTrack(t, localStreamRef.current!));
          await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          ws.send(JSON.stringify({ type: "answer", sdp: pc.localDescription }));
        } else if (data.type === "answer") {
          console.log("Got answer");
          await pcRef.current?.setRemoteDescription(new RTCSessionDescription(data.sdp));
        } else if (data.type === "ice") {
          console.log("Got ICE candidate");
          try {
            await pcRef.current?.addIceCandidate(new RTCIceCandidate(data.candidate));
          } catch (e) {
            console.warn("addIceCandidate failed", e);
          }
        } else if (data.type === "leave") {
          console.log("Peer left");
          cleanupPeerConnection();
        }
      } catch (err) {
        console.error("WS message parse error", err);
      }
    };

    ws.onclose = () => {
      console.log("WS closed");
      setStatus("signaling-closed");
      cleanupPeerConnection();
    };

    ws.onerror = (e) => {
      console.error("WS error", e);
      setStatus("signaling-error");
    };

    
    setTimeout(async () => {
      
      setIsCaller(true);
      const pc = createPeerConnection();
      
      localStreamRef.current?.getTracks().forEach((t) => pc.addTrack(t, localStreamRef.current!));

      try {
        const offer = await pc.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
        await pc.setLocalDescription(offer);
        ws.send(JSON.stringify({ type: "offer", sdp: pc.localDescription }));
        setStatus("offer-sent");
      } catch (e) {
        console.error("createOffer failed", e);
      }
    }, 700);
  }

  function cleanupPeerConnection() {
    try {
      pcRef.current?.close();
    } catch (e) {}
    pcRef.current = null;
    setConnected(false);
    setStatus("pc-closed");
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
  }

  function cleanup() {
    try {
      wsRef.current?.close();
    } catch (e) {}
    try {
      localStreamRef.current?.getTracks().forEach((t) => t.stop());
    } catch (e) {}
    cleanupPeerConnection();
  }

  async function leave() {
    try {
      wsRef.current?.send(JSON.stringify({ type: "leave" }));
    } catch (e) {}
    cleanup();
    setStatus("left");
  }

  async function toggleMute() {
    if (!localStreamRef.current) return;
    localStreamRef.current.getAudioTracks().forEach((t) => (t.enabled = !t.enabled));
    setMuted((m) => !m);
  }

  async function toggleCamera() {
    if (!localStreamRef.current) return;
    localStreamRef.current.getVideoTracks().forEach((t) => (t.enabled = !t.enabled));
    setCameraOff((c) => !c);
  }

  async function shareScreen() {
    if (sharingScreen) {
      
      const tracks = localStreamRef.current?.getVideoTracks() || [];
      const camTrack = tracks.find((t) => t.kind === "video");
      if (camTrack) {
        
        pcRef.current?.getSenders().forEach((s) => {
          if (s.track?.kind === "video") {
            
            s.replaceTrack(camTrack);
          }
        });
      }
      setSharingScreen(false);
      return;
    }

    try {
      const screenStream = (await (navigator.mediaDevices as any).getDisplayMedia({ video: true })) as MediaStream;
      const screenTrack = screenStream.getVideoTracks()[0];
      
      pcRef.current?.getSenders().forEach((s) => {
        if (s.track?.kind === "video") {
          s.replaceTrack(screenTrack).catch(() => {});
        }
      });
      
      if (localVideoRef.current) localVideoRef.current.srcObject = screenStream;
      screenTrack.onended = async () => {
        
        if (localStreamRef.current && localVideoRef.current) {
          localVideoRef.current.srcObject = localStreamRef.current;
          pcRef.current?.getSenders().forEach((s) => {
            if (s.track?.kind === "video") s.replaceTrack(localStreamRef.current!.getVideoTracks()[0]);
          });
        }
        setSharingScreen(false);
      };
      setSharingScreen(true);
    } catch (e) {
      console.warn("Screen share failed", e);
    }
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-gradient-to-br from-indigo-50 via-rose-50 to-yellow-50">
    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
        Clinic 2 Clinic Conferencing
      </h2>
      <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            A Connection Today, A Life Saved Tomorrow.
          </p>
    <div className="min-h-screen p-6 flex items-center justify-center bg-gradient-to-br from-indigo-50 via-rose-50 to-yellow-50">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="col-span-1 p-6 rounded-3xl bg-white/80 backdrop-blur-sm shadow-2xl border border-white/60">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold">DR</div>
            <div>
              <h3 className="text-lg font-semibold">Village ↔ City Hospital</h3>
              <p className="text-sm text-gray-600">Low-latency live consultation interface</p>
            </div>
          </div>
          

          <div className="mt-6 space-y-3">
            <div className="text-sm text-gray-700">Status: <span className="font-medium">{status}</span></div>
            <div className="text-sm text-gray-700">Connection RTT: <span className="font-medium">{rttMs ?? '—'} ms</span></div>
            <div className="text-sm text-gray-700">ICE candidates sent: <span className="font-medium">{iceCount}</span></div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              className={`${btnClass} bg-gradient-to-r from-green-400 to-teal-500 text-white`}
              onClick={join}
              aria-label="Connect call"
            >
              Start / Join Call
            </button>

            <button
              className={`${btnClass} bg-gradient-to-r from-rose-400 to-pink-500 text-white`}
              onClick={leave}
              aria-label="Leave call"
            >
              End Call
            </button>

            <div className="flex gap-2">
              <button className={`${btnClass} bg-white border`} onClick={toggleMute} aria-pressed={muted}>
                {muted ? 'Unmute' : 'Mute'}
              </button>
              <button className={`${btnClass} bg-white border`} onClick={toggleCamera} aria-pressed={cameraOff}>
                {cameraOff ? 'Cam On' : 'Cam Off'}
              </button>
              <button className={`${btnClass} bg-white border`} onClick={shareScreen} aria-pressed={sharingScreen}>
                {sharingScreen ? 'Stop Share' : 'Share Screen'}
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-500">Notes: For best results use a wired or 4G/5G connection. Add TURN server(s) in production for reliable connectivity across networks.</div>
          </div>
        </div>

       
        <div className="col-span-1 md:col-span-2 relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white to-indigo-50 border border-white/60">
          <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-black/60 text-white text-xs">Room: {room}</div>
            <div className={`px-3 py-1 rounded-full text-xs ${connected ? 'bg-green-500 text-white' : 'bg-yellow-200 text-gray-700'}`}> {connected ? 'Connected' : 'Not connected'}</div>
          </div>

          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            muted={false}
            className="w-full h-[520px] object-cover bg-gray-900"
          />

          
          <div className="absolute bottom-4 right-4 w-56 h-40 rounded-xl overflow-hidden border border-white/40 shadow-lg bg-black">
            <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          </div>

          <div className="absolute top-4 right-4 text-right p-3">
            <div className="text-xs text-gray-700">Patient → Specialist</div>
          </div>
        </div>

        
        <div className="col-span-3 text-center mt-2">
          <div className="inline-flex items-center gap-2 p-3 rounded-full bg-white/80 shadow-sm border">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 5a2 2 0 012-2h2a2 2 0 012 2v2H4v6h4v2H6a2 2 0 01-2-2V5z" />
              <path d="M14 7h4v6a2 2 0 01-2 2h-2v-2h2V7z" />
            </svg>
            <div className="text-sm">Designed for low-bandwidth rural → hospital consultations. Make sure patient consents before starting video.</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
} 
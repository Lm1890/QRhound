'use client'

export default function GenieAnimation() {
  return (
    <div className="relative w-72 h-[420px] mx-auto">
      <style>{`
        @keyframes tailWag {
          0%, 100% { transform: rotate(-20deg); }
          50% { transform: rotate(20deg); }
        }
        @keyframes breathe {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes eyeBlink {
          0%, 42%, 44%, 100% { transform: scaleY(1); }
          43% { transform: scaleY(0.05); }
        }
        @keyframes tongueWiggle {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.85); }
        }
        @keyframes qrFloat {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        .dog-body { animation: breathe 3s ease-in-out infinite; }
        .tail { animation: tailWag 0.5s ease-in-out infinite; transform-origin: 210px 220px; }
        .eye-blink-l { animation: eyeBlink 4s ease-in-out infinite; transform-origin: 135px 135px; }
        .eye-blink-r { animation: eyeBlink 4s ease-in-out infinite; transform-origin: 180px 135px; }
        .tongue { animation: tongueWiggle 2s ease-in-out infinite; }
        .qr-tag { animation: qrFloat 3s ease-in-out infinite; }
        .sp-1 { animation: sparkle 2s ease-in-out infinite; }
        .sp-2 { animation: sparkle 2.5s ease-in-out infinite 0.8s; }
        .sp-3 { animation: sparkle 1.8s ease-in-out infinite 1.5s; }
      `}</style>

      <svg viewBox="0 0 320 420" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="dog-body">
          {/* === TAIL === */}
          <g className="tail">
            <path d="M210,220 Q245,195 250,170" stroke="#2D2D2D" strokeWidth="16" strokeLinecap="round" fill="none" />
          </g>

          {/* === BODY === */}
          {/* Main body */}
          <ellipse cx="160" cy="265" rx="72" ry="55" fill="#2D2D2D" />
          {/* Chest tan patch */}
          <ellipse cx="145" cy="285" rx="30" ry="30" fill="#D4956B" />

          {/* === LEGS === */}
          {/* Back legs */}
          <rect x="192" y="300" width="24" height="60" rx="12" fill="#2D2D2D" />
          <rect x="110" y="300" width="24" height="60" rx="12" fill="#1F1F1F" />
          {/* Front legs */}
          <rect x="170" y="295" width="22" height="68" rx="11" fill="#2D2D2D" />
          <rect x="128" y="295" width="22" height="68" rx="11" fill="#1F1F1F" />
          {/* Paws */}
          <ellipse cx="204" cy="362" rx="16" ry="8" fill="#D4956B" />
          <ellipse cx="122" cy="362" rx="16" ry="8" fill="#C4885C" />
          <ellipse cx="181" cy="365" rx="15" ry="8" fill="#D4956B" />
          <ellipse cx="139" cy="365" rx="15" ry="8" fill="#C4885C" />

          {/* === COLLAR === */}
          <path d="M105,215 Q130,232 160,232 Q190,232 215,215" fill="none" stroke="#EF4444" strokeWidth="10" strokeLinecap="round" />
          <circle cx="160" cy="232" r="5" fill="#FDE68A" />

          {/* === QR TAG === */}
          <g className="qr-tag">
            <path d="M160,237 L160,250" stroke="#D97706" strokeWidth="2" />
            <rect x="147" y="250" width="26" height="26" rx="4" fill="#FDE68A" />
            <rect x="149" y="252" width="22" height="22" rx="2" fill="white" />
            {/* Mini QR pattern */}
            <rect x="151" y="254" width="5" height="5" rx="1" fill="#1A1A1A" />
            <rect x="158" y="254" width="3" height="3" fill="#1A1A1A" />
            <rect x="163" y="254" width="5" height="5" rx="1" fill="#1A1A1A" />
            <rect x="151" y="261" width="3" height="3" fill="#1A1A1A" />
            <rect x="156" y="261" width="5" height="3" fill="#1A1A1A" />
            <rect x="163" y="261" width="3" height="3" fill="#1A1A1A" />
            <rect x="151" y="266" width="5" height="5" rx="1" fill="#1A1A1A" />
            <rect x="158" y="268" width="3" height="3" fill="#1A1A1A" />
            <rect x="163" y="266" width="5" height="5" rx="1" fill="#1A1A1A" />
          </g>

          {/* === HEAD === */}
          {/* Main head shape */}
          <ellipse cx="158" cy="150" rx="55" ry="50" fill="#2D2D2D" />

          {/* Ears */}
          <ellipse cx="108" cy="108" rx="18" ry="28" transform="rotate(-15, 108, 108)" fill="#2D2D2D" />
          <ellipse cx="108" cy="108" rx="10" ry="18" transform="rotate(-15, 108, 108)" fill="#D4956B" opacity="0.4" />
          <ellipse cx="208" cy="108" rx="18" ry="28" transform="rotate(15, 208, 108)" fill="#2D2D2D" />
          <ellipse cx="208" cy="108" rx="10" ry="18" transform="rotate(15, 208, 108)" fill="#D4956B" opacity="0.4" />

          {/* Tan eyebrow markings */}
          <ellipse cx="135" cy="132" rx="12" ry="7" fill="#D4956B" />
          <ellipse cx="180" cy="132" rx="12" ry="7" fill="#D4956B" />

          {/* Muzzle */}
          <ellipse cx="158" cy="172" rx="28" ry="20" fill="#D4956B" />

          {/* Eyes - big emoji style */}
          <g className="eye-blink-l">
            <circle cx="135" cy="140" r="12" fill="white" />
            <circle cx="138" cy="140" r="8" fill="#3B2010" />
            <circle cx="138" cy="139" r="5" fill="#1A0F05" />
            <circle cx="140" cy="137" r="3" fill="white" />
          </g>
          <g className="eye-blink-r">
            <circle cx="180" cy="140" r="12" fill="white" />
            <circle cx="183" cy="140" r="8" fill="#3B2010" />
            <circle cx="183" cy="139" r="5" fill="#1A0F05" />
            <circle cx="185" cy="137" r="3" fill="white" />
          </g>

          {/* Nose */}
          <ellipse cx="158" cy="168" rx="10" ry="7" fill="#1A1A1A" />
          <ellipse cx="155" cy="166" rx="3" ry="2" fill="#444" opacity="0.5" />

          {/* Mouth */}
          <path d="M148,178 Q153,184 158,178 Q163,184 168,178" fill="none" stroke="#8B5530" strokeWidth="2" strokeLinecap="round" />

          {/* Tongue */}
          <g className="tongue">
            <path d="M153,183 Q152,196 156,200 Q160,196 159,183" fill="#E8687A" />
          </g>

          {/* Cheek blush */}
          <circle cx="120" cy="158" r="8" fill="#E8687A" opacity="0.15" />
          <circle cx="196" cy="158" r="8" fill="#E8687A" opacity="0.15" />

          {/* Ground shadow */}
          <ellipse cx="158" cy="378" rx="65" ry="8" fill="#000" opacity="0.06" />

          {/* Sparkles */}
          <g className="sp-1">
            <polygon points="185,255 187,250 189,255 187,260" fill="#FBBF24" />
            <polygon points="183,253 191,253 191,257 183,257" fill="#FBBF24" />
          </g>
          <g className="sp-2">
            <polygon points="133,258 135,254 137,258 135,262" fill="#FBBF24" />
            <polygon points="131,256 139,256 139,260 131,260" fill="#FBBF24" />
          </g>
          <g className="sp-3">
            <polygon points="170,280 171,277 172,280 171,283" fill="#FDE68A" />
            <polygon points="168,279 174,279 174,281 168,281" fill="#FDE68A" />
          </g>
        </g>
      </svg>
    </div>
  )
}

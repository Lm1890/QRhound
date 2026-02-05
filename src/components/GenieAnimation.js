'use client'

export default function GenieAnimation() {
  return (
    <div className="relative w-72 h-[420px] mx-auto">
      <style>{`
        @keyframes tailWag {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(25deg); }
        }
        @keyframes breathe {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-3px) scaleY(1.02); }
        }
        @keyframes tongue {
          0%, 70%, 100% { transform: scaleY(1) translateY(0); }
          80% { transform: scaleY(0.9) translateY(-1px); }
        }
        @keyframes earTwitch {
          0%, 85%, 100% { transform: rotate(0deg); }
          90% { transform: rotate(-5deg); }
          95% { transform: rotate(3deg); }
        }
        @keyframes earTwitchR {
          0%, 80%, 100% { transform: rotate(0deg); }
          85% { transform: rotate(5deg); }
          92% { transform: rotate(-3deg); }
        }
        @keyframes eyeBlink {
          0%, 42%, 44%, 100% { transform: scaleY(1); }
          43% { transform: scaleY(0.05); }
        }
        @keyframes pawTap {
          0%, 85%, 100% { transform: rotate(0deg); }
          90% { transform: rotate(-3deg) translateY(2px); }
          95% { transform: rotate(0deg); }
        }
        @keyframes collarShine {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes barkBounce {
          0%, 90%, 100% { transform: translateY(0) scale(1); }
          93% { transform: translateY(-8px) scale(1.02); }
          96% { transform: translateY(0) scale(0.99); }
        }
        @keyframes sniffNose {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes qrFloat {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-5px) rotate(2deg); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        .dog-body { animation: breathe 3s ease-in-out infinite; }
        .dog-bounce { animation: barkBounce 5s ease-in-out infinite; }
        .tail { animation: tailWag 0.4s ease-in-out infinite; transform-origin: 215px 235px; }
        .tongue-anim { animation: tongue 3s ease-in-out infinite; }
        .ear-l { animation: earTwitch 4s ease-in-out infinite; transform-origin: 118px 95px; }
        .ear-r { animation: earTwitchR 5s ease-in-out infinite; transform-origin: 202px 95px; }
        .eye-blink { animation: eyeBlink 4s ease-in-out infinite; }
        .paw-l { animation: pawTap 6s ease-in-out infinite; transform-origin: 120px 350px; }
        .collar-shine { animation: collarShine 2s ease-in-out infinite; }
        .nose-sniff { animation: sniffNose 2s ease-in-out infinite; }
        .qr-tag { animation: qrFloat 3s ease-in-out infinite; }
        .sp-1 { animation: sparkle 2s ease-in-out infinite; }
        .sp-2 { animation: sparkle 2.5s ease-in-out infinite 0.8s; }
        .sp-3 { animation: sparkle 1.8s ease-in-out infinite 1.5s; }
      `}</style>

      <svg viewBox="0 0 320 440" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="blackFur" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2D2D2D" />
            <stop offset="100%" stopColor="#1A1A1A" />
          </linearGradient>
          <linearGradient id="blackFurLight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3D3D3D" />
            <stop offset="100%" stopColor="#222222" />
          </linearGradient>
          <linearGradient id="tanFur" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4956B" />
            <stop offset="100%" stopColor="#B8784E" />
          </linearGradient>
          <linearGradient id="tanLight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E8B08A" />
            <stop offset="100%" stopColor="#C4885C" />
          </linearGradient>
          <linearGradient id="tanDark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A86840" />
            <stop offset="100%" stopColor="#8B5530" />
          </linearGradient>
          <radialGradient id="noseGrad" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#4A4A4A" />
            <stop offset="100%" stopColor="#1A1A1A" />
          </radialGradient>
          <linearGradient id="collarRed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>
          <linearGradient id="tagGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        <g className="dog-bounce">
          {/* ===== TAIL ===== */}
          <g className="tail">
            <path d="M215,235 Q240,215 248,195 Q252,182 245,178" stroke="url(#blackFur)" strokeWidth="14" strokeLinecap="round" fill="none" />
            <path d="M215,235 Q238,217 246,198 Q250,186 244,182" stroke="#3D3D3D" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.3" />
          </g>

          {/* ===== BODY ===== */}
          <g className="dog-body">
            {/* Main black torso */}
            <ellipse cx="160" cy="270" rx="75" ry="55" fill="url(#blackFur)" />
            <ellipse cx="145" cy="255" rx="40" ry="28" fill="#333" opacity="0.3" />

            {/* Chest tan marking */}
            <ellipse cx="140" cy="290" rx="32" ry="35" fill="url(#tanFur)" />
            <ellipse cx="137" cy="285" rx="20" ry="22" fill="url(#tanLight)" opacity="0.3" />

            {/* Right back leg */}
            <path d="M200,300 Q210,340 205,370 Q202,385 210,390" fill="url(#blackFur)" stroke="url(#blackFur)" strokeWidth="2" />
            <ellipse cx="210" cy="392" rx="18" ry="8" fill="url(#blackFur)" />
            <ellipse cx="212" cy="393" rx="15" ry="7" fill="url(#tanDark)" />

            {/* Left back leg */}
            <path d="M185,305 Q198,345 195,370 Q193,382 198,388" fill="#1A1A1A" stroke="#1A1A1A" strokeWidth="2" />
            <ellipse cx="198" cy="390" rx="16" ry="7" fill="#1A1A1A" />
            <ellipse cx="199" cy="391" rx="13" ry="6" fill="url(#tanDark)" opacity="0.8" />

            {/* Right front leg */}
            <path d="M130,300 L128,365 Q127,380 135,385" fill="url(#blackFur)" stroke="url(#blackFur)" strokeWidth="20" strokeLinejoin="round" />
            <ellipse cx="135" cy="388" rx="17" ry="8" fill="url(#blackFur)" />
            <ellipse cx="136" cy="389" rx="14" ry="7" fill="url(#tanFur)" />
            <path d="M129,389 L132,389 M135,389 L138,389" stroke="#A86840" strokeWidth="1" opacity="0.5" />

            {/* Left front leg */}
            <g className="paw-l">
              <path d="M105,298 L100,365 Q98,380 106,385" fill="url(#blackFur)" stroke="url(#blackFur)" strokeWidth="20" strokeLinejoin="round" />
              <ellipse cx="106" cy="388" rx="17" ry="8" fill="url(#blackFur)" />
              <ellipse cx="107" cy="389" rx="14" ry="7" fill="url(#tanFur)" />
              <path d="M100,389 L103,389 M106,389 L109,389" stroke="#A86840" strokeWidth="1" opacity="0.5" />
            </g>

            {/* ===== COLLAR ===== */}
            <path d="M100,210 Q130,225 160,225 Q190,225 220,210" fill="none" stroke="url(#collarRed)" strokeWidth="10" strokeLinecap="round" />
            <path d="M102,210 Q132,224 160,224 Q188,224 218,210" fill="none" stroke="#FCA5A5" strokeWidth="3" strokeLinecap="round" opacity="0.2" className="collar-shine" />
            {/* Buckle */}
            <rect x="153" y="218" width="14" height="10" rx="2" fill="#D97706" />
            <rect x="155" y="220" width="10" height="6" rx="1" fill="#FDE68A" opacity="0.4" />

            {/* QR Code tag */}
            <g className="qr-tag">
              <path d="M160,228 L160,242" stroke="#D97706" strokeWidth="2" />
              <rect x="148" y="242" width="24" height="24" rx="3" fill="url(#tagGold)" />
              <rect x="150" y="244" width="20" height="20" rx="2" fill="white" />
              {/* Mini QR pattern */}
              <rect x="152" y="246" width="4" height="4" fill="#1A1A1A" />
              <rect x="158" y="246" width="4" height="4" fill="#1A1A1A" />
              <rect x="164" y="246" width="4" height="4" fill="#1A1A1A" />
              <rect x="152" y="252" width="4" height="4" fill="#1A1A1A" />
              <rect x="158" y="252" width="4" height="2" fill="#1A1A1A" />
              <rect x="164" y="254" width="4" height="2" fill="#1A1A1A" />
              <rect x="152" y="258" width="4" height="4" fill="#1A1A1A" />
              <rect x="160" y="258" width="2" height="4" fill="#1A1A1A" />
              <rect x="164" y="258" width="4" height="4" fill="#1A1A1A" />
            </g>
          </g>

          {/* ===== HEAD ===== */}
          <g>
            <ellipse cx="155" cy="155" rx="58" ry="52" fill="url(#blackFur)" />
            <ellipse cx="150" cy="140" rx="32" ry="25" fill="url(#blackFurLight)" opacity="0.3" />

            {/* Ears */}
            <g className="ear-l">
              <path d="M105,115 Q90,85 100,70 Q110,60 120,75 Q128,90 118,115" fill="url(#blackFur)" />
              <path d="M108,110 Q97,88 105,76 Q112,68 118,80 Q124,92 116,110" fill="#2D2D2D" opacity="0.5" />
            </g>
            <g className="ear-r">
              <path d="M198,112 Q210,82 203,68 Q195,58 187,72 Q180,88 190,112" fill="url(#blackFur)" />
              <path d="M196,108 Q206,85 200,74 Q194,66 189,77 Q184,90 192,108" fill="#2D2D2D" opacity="0.5" />
            </g>

            {/* Tan eyebrow dots - rottweiler signature */}
            <ellipse cx="130" cy="135" rx="14" ry="9" fill="url(#tanFur)" />
            <ellipse cx="180" cy="135" rx="14" ry="9" fill="url(#tanFur)" />

            {/* Muzzle */}
            <ellipse cx="155" cy="175" rx="30" ry="22" fill="url(#tanFur)" />
            <ellipse cx="155" cy="172" rx="22" ry="15" fill="url(#tanLight)" opacity="0.3" />

            {/* Tan cheeks */}
            <ellipse cx="120" cy="162" rx="10" ry="12" fill="url(#tanFur)" opacity="0.7" />
            <ellipse cx="190" cy="162" rx="10" ry="12" fill="url(#tanFur)" opacity="0.7" />

            {/* Eyes */}
            <g className="eye-blink" style={{ transformOrigin: '133px 138px' }}>
              <ellipse cx="133" cy="138" rx="10" ry="10" fill="white" />
              <ellipse cx="135" cy="139" rx="7" ry="7" fill="#3B2010" />
              <circle cx="135" cy="138" r="4" fill="#1A0F05" />
              <ellipse cx="137" cy="136" rx="2.5" ry="3" fill="white" />
              <circle cx="133" cy="141" r="1" fill="white" opacity="0.4" />
            </g>
            <g className="eye-blink" style={{ transformOrigin: '177px 138px' }}>
              <ellipse cx="177" cy="138" rx="10" ry="10" fill="white" />
              <ellipse cx="179" cy="139" rx="7" ry="7" fill="#3B2010" />
              <circle cx="179" cy="138" r="4" fill="#1A0F05" />
              <ellipse cx="181" cy="136" rx="2.5" ry="3" fill="white" />
              <circle cx="177" cy="141" r="1" fill="white" opacity="0.4" />
            </g>

            {/* Eyebrows */}
            <path d="M120,128 Q130,123 143,127" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M167,127 Q180,123 190,128" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />

            {/* Nose */}
            <g className="nose-sniff">
              <ellipse cx="155" cy="168" rx="14" ry="10" fill="url(#noseGrad)" />
              <ellipse cx="155" cy="167" rx="10" ry="7" fill="#2D2D2D" />
              <ellipse cx="150" cy="168" rx="3" ry="2.5" fill="#111" />
              <ellipse cx="160" cy="168" rx="3" ry="2.5" fill="#111" />
              <ellipse cx="153" cy="164" rx="4" ry="2" fill="white" opacity="0.15" />
            </g>

            {/* Mouth */}
            <path d="M155,178 L155,183" stroke="#8B5530" strokeWidth="1.5" />
            <path d="M142,186 Q148,192 155,183 Q162,192 168,186" fill="none" stroke="#8B5530" strokeWidth="1.5" strokeLinecap="round" />

            {/* Tongue */}
            <g className="tongue-anim">
              <path d="M150,190 Q148,205 152,212 Q155,215 158,212 Q162,205 160,190" fill="#E8687A" />
              <path d="M152,192 Q151,203 153,208" fill="none" stroke="#D45565" strokeWidth="1" opacity="0.4" />
              <path d="M154,195 Q153,202 155,207" fill="none" stroke="#F5A0AA" strokeWidth="1.5" opacity="0.4" />
            </g>

            {/* Jowls */}
            <path d="M130,182 Q135,188 142,186" fill="none" stroke="#A86840" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
            <path d="M180,182 Q175,188 168,186" fill="none" stroke="#A86840" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
          </g>

          {/* Ground shadow */}
          <ellipse cx="155" cy="400" rx="70" ry="8" fill="#000" opacity="0.08" />

          {/* Sparkles around QR tag */}
          <g className="sp-1">
            <polygon points="182,248 184,243 186,248 184,253" fill="#FBBF24" />
            <polygon points="179,246 189,246 189,250 179,250" fill="#FBBF24" />
          </g>
          <g className="sp-2">
            <polygon points="138,250 140,246 142,250 140,254" fill="#FBBF24" />
            <polygon points="136,248 144,248 144,252 136,252" fill="#FBBF24" />
          </g>
          <g className="sp-3">
            <polygon points="170,272 171,269 172,272 171,275" fill="#FDE68A" />
            <polygon points="168,271 174,271 174,273 168,273" fill="#FDE68A" />
          </g>
        </g>
      </svg>
    </div>
  )
}

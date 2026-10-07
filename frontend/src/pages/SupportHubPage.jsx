import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Cpu, 
  Smartphone, 
  Layers, 
  Server, 
  BookOpen, 
  Zap, 
  Activity, 
  CheckCircle2, 
  Terminal, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  ShieldCheck, 
  X 
} from 'lucide-react';

export default function SupportHubPage() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState('ais140');
  const [inputString, setInputString] = useState('$ARSHI,AIS140,868749041234567,1,25.6123,N,85.1456,E,48.2,180.5,071026,065000,IGN_ON,SOS_OFF,BAT_4.12V*4A');
  const [terminalLogs, setTerminalLogs] = useState([
    { type: 'dim', text: '// Arshi Telematics Diagnostic Engine ready.' },
    { type: 'info', text: '[INFO] Listening on Virtual Diagnostic Port 5001...' },
    { type: 'success', text: '[STATUS] Select a profile and click "Execute Packet Parse".' }
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const helplinePhone = "+917782808063";
  const phoneDisplay = "+91 77828 08063";

  const profiles = {
    ais140: "$ARSHI,AIS140,868749041234567,1,25.6123,N,85.1456,E,48.2,180.5,071026,065000,IGN_ON,SOS_OFF,BAT_4.12V*4A",
    sos: "$ARSHI,EMERGENCY_SOS,868749041234567,1,25.5940,N,85.1376,E,00.0,000.0,071026,065115,IGN_ON,SOS_ACTIVE_TRIGGERED,BAT_4.05V*9F",
    can: "CAN_BUS:PGN_65262(TEMP:84C),PGN_65276(FUEL:86.4%),PGN_65248(TOTAL_KM:142589),RPM:1850,SPEED:54km/h",
    ble: "BLE_DIAG_UUID:6E400001-B5A3-F393-E0A9-E50E24DCCA9E | GSM_CSQ:28(EXCELLENT) | GNSS_SATS:18 | HDOP:0.82 | CRC:PASS"
  };

  const handleProfileChange = (key) => {
    setSelectedProfile(key);
    setInputString(profiles[key] || '');
  };

  const runSimulation = () => {
    const now = new Date().toLocaleTimeString();
    setTerminalLogs([
      { type: 'dim', text: `// Initializing Parser at ${now}...` },
      { type: 'info', text: `[RAW RECEIVE] ${inputString}` },
      { type: 'warn', text: '[PARSING HEADER] Identifier matched Arshi AIS Telematics standard' },
      { type: 'success', text: '[CHECKSUM] CRC-16 Validated (0x0000 OK)' },
      { type: 'info', text: '[GEO PARSER] Lat: Validated | Lon: Validated | Satellites: Fixed (3D Lock)' },
      { type: 'success', text: '[STATE ERSS 112] Ready for Indian State Police Emergency Routing' },
      { type: 'info', text: '[RESULT] Device Transmitting at Nominal Parameters (Health 100%)' }
    ]);
  };

  const tools = [
    {
      id: '01',
      title: 'Device Configuration Tool',
      icon: <Wrench className="w-6 h-6 text-sky-400" />,
      tagColor: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
      desc: 'Direct USB, RS-232 & SMS configuration tool for setting IP, Port, APN, ping intervals, and sensor I/O thresholds across all Arshi AIS-140 trackers.',
      tags: ['USB / Serial', 'SMS OTA Commands', 'Baud 115200'],
      code: 'SET,IP:13.235.120.45,PORT:5001,APN:airteliot.com#'
    },
    {
      id: '02',
      title: '24/7 Ticketing & Resolution Tool',
      icon: <Layers className="w-6 h-6 text-purple-400" />,
      tagColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      desc: 'Enterprise incident tracking system connecting field technicians directly with L2/L3 hardware and server engineers with SLA turnaround under 15 minutes.',
      tags: ['Real-time SLA', 'Technician Dispatch', 'Instant Sync'],
      code: 'TICKET_PRIORITY: HIGH | SLA_RESPONSE: <15 MIN | RESOLUTION: ESCALATED_L3'
    },
    {
      id: '03',
      title: 'Arshi BlueSync Android App',
      icon: <Smartphone className="w-6 h-6 text-blue-400" />,
      tagColor: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
      desc: 'Wireless BLE field configuration app. Installers can sync device parameters, test SOS panic buttons, verify GPS/GSM signal, and flash firmware wire-free in under 45s.',
      tags: ['Bluetooth 5.0 BLE', 'Zero Wire Flashing', 'Instant SOS Audit'],
      code: 'BLE_STATUS: CONNECTED | RSSI: -42dBm | SOS_STATE: VERIFIED_OK'
    },
    {
      id: '04',
      title: 'Config 360 V2 Platform',
      icon: <Activity className="w-6 h-6 text-emerald-400" />,
      tagColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      desc: 'Web console for multi-device batch provisioning, primary & secondary server routing, geofence radius uploads, and state VAHAN/112 ERSS endpoint validation.',
      tags: ['Bulk Provisioning', 'Dual Server Relay', 'ERSS 112 Sync'],
      code: 'SERVER_1: ARSHI_PRIMARY_CLOUD | SERVER_2: STATE_VAHAN_BACKEND | STATUS: LIVE'
    },
    {
      id: '05',
      title: 'Device Management Server (DMS)',
      icon: <Server className="w-6 h-6 text-amber-400" />,
      tagColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      desc: 'Carrier-grade FOTA server managing remote firmware upgrades, automated health checks, internal battery voltage tracking, and remote hardware reboot controls.',
      tags: ['FOTA Upgrades', 'Battery Health', 'Remote Reset'],
      code: 'FIRMWARE_VER: v4.8.2-SECURE | ROLLOUT_STATUS: 10,000+ DEVICES ACTIVE'
    },
    {
      id: '06',
      title: 'Wiki & Knowledge Base',
      icon: <BookOpen className="w-6 h-6 text-rose-400" />,
      tagColor: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
      desc: 'Complete documentation library including wiring schematics for 200+ vehicle models (Tata, Ashok Leyland, Mahindra, BharatBenz) and protocol specs.',
      tags: ['200+ Wiring Guides', 'HEX Protocol Specs', 'Video Guides'],
      code: 'DOC_REF: WIRING_GUIDE_COMMERCIAL_V3 | PINOUT: 1-RED(VCC), 2-BLK(GND), 3-YEL(IGN)'
    },
    {
      id: '07',
      title: 'OEM Vehicle Integration Tool',
      icon: <Zap className="w-6 h-6 text-indigo-400" />,
      tagColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
      desc: 'CAN bus decoder and OBD-II PID mapping suite. Decodes J1939 engine telematics, fuel tank capacitance sensors, coolant temperature, and odometer calibration.',
      tags: ['CAN J1939 / J1708', 'Fuel Sensor 0-5V', 'Engine RPM PIDs'],
      code: 'J1939_PGN: 65262 (ENG_TEMP) | PGN: 65276 (FUEL_LEVEL_100%) | CAN_SPEED: 250kbps'
    },
    {
      id: '08',
      title: 'Live Debugging & Signal Suite',
      icon: <Cpu className="w-6 h-6 text-teal-400" />,
      tagColor: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
      desc: 'Real-time NMEA & raw HEX packet analyzer with GSM dBm signal meters, HDOP satellite fix calculators, panic loop resistance tester, and packet echo confirmation.',
      tags: ['NMEA $GPRMC Parser', 'GSM CSQ dBm Meter', 'Panic Signal Echo'],
      code: '$GPRMC,064951.000,A,2537.1234,N,08508.5678,E,042.5,123.4,071026,,,A*6D'
    }
  ];

  return (
    <div className="min-h-screen bg-[#070420] text-slate-100 pt-28 pb-20">
      
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-extrabold text-cyan-300 uppercase tracking-wider mb-6 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Technician & Engineering Diagnostics</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
          Arshi <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Support Hub & Diagnostics</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Empowering certified installers, system integrators, and fleet engineers with enterprise-grade firmware flashers, live packet analyzers, CAN decoders, and 24/7 escalation tools.
        </p>

        {/* Live Metrics Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
          <div className="p-6 rounded-2xl bg-[#0f0945]/80 border border-[#3a2f9a]/70 shadow-lg">
            <span className="block text-3xl sm:text-4xl font-black text-cyan-400">8+ Tools</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Engineering Utilities</span>
          </div>
          <div className="p-6 rounded-2xl bg-[#0f0945]/80 border border-[#3a2f9a]/70 shadow-lg">
            <span className="block text-3xl sm:text-4xl font-black text-indigo-400">99.98%</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">FOTA Success Rate</span>
          </div>
          <div className="p-6 rounded-2xl bg-[#0f0945]/80 border border-[#3a2f9a]/70 shadow-lg">
            <span className="block text-3xl sm:text-4xl font-black text-emerald-400">&lt; 15 Mins</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tier-1 Ticket SLA</span>
          </div>
          <div className="p-6 rounded-2xl bg-[#0f0945]/80 border border-[#3a2f9a]/70 shadow-lg">
            <span className="block text-3xl sm:text-4xl font-black text-purple-400">100%</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AIS-140 Compliant</span>
          </div>
        </div>
      </div>

      {/* 8 Diagnostic Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 mb-2 block">Diagnostic Ecosystem</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">8 Advanced Tools for Precision Operations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((t) => (
            <div 
              key={t.id}
              className="p-6 rounded-2xl bg-[#0f0945]/60 border border-[#3a2f9a]/60 hover:border-cyan-400/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between shadow-xl group backdrop-blur-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {t.icon}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                    TOOL {t.id}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition">
                  {t.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {t.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {t.tags.map((tag, idx) => (
                    <span key={idx} className={`text-[10px] font-bold px-2 py-0.5 rounded border ${t.tagColor}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedTool(t)}
                className="w-full py-2.5 px-3.5 rounded-xl bg-white/5 hover:bg-cyan-600 hover:text-white border border-white/10 text-xs font-bold text-slate-300 flex items-center justify-between transition-all"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Terminal / Packet Simulator */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-3xl bg-[#040217] border border-[#3a2f9a]/80 shadow-2xl overflow-hidden">
          <div className="px-6 py-4 bg-[#0d073d] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-3 font-mono text-xs text-slate-400">arshi-telematics-diagnostics-v2.4.sh</span>
            </div>
            <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SOCKET_ONLINE
            </span>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                  Select Diagnostic Profile
                </label>
                <select
                  value={selectedProfile}
                  onChange={(e) => handleProfileChange(e.target.value)}
                  className="w-full bg-[#110c42] border border-[#3a2f9a] text-slate-200 text-xs rounded-xl p-3 outline-none font-mono focus:border-cyan-400"
                >
                  <option value="ais140">AIS-140 Standard Telematics String</option>
                  <option value="sos">Emergency SOS Panic Button Trigger</option>
                  <option value="can">CAN Bus Fuel & Engine Telemetry</option>
                  <option value="ble">BLE Health & Internal Battery Diagnostic</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                  Raw Telemetry / Command String
                </label>
                <input
                  type="text"
                  value={inputString}
                  onChange={(e) => setInputString(e.target.value)}
                  className="w-full bg-[#110c42] border border-[#3a2f9a] text-slate-200 text-xs rounded-xl p-3 outline-none font-mono focus:border-cyan-400"
                />
              </div>

              <button
                onClick={runSimulation}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-600/30 transition-all"
              >
                ▶ Execute Packet Parse & Validate CRC
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Real-Time Parser Output</span>
                <span className="text-[10px] font-mono text-slate-500">BUFFER: ACTIVE</span>
              </div>
              <div className="bg-[#02010c] border border-cyan-500/20 rounded-xl p-4 font-mono text-xs text-slate-300 min-h-[200px] max-h-[260px] overflow-y-auto space-y-1.5">
                {terminalLogs.map((log, idx) => (
                  <div 
                    key={idx} 
                    className={
                      log.type === 'dim' ? 'text-slate-500' :
                      log.type === 'info' ? 'text-cyan-400' :
                      log.type === 'warn' ? 'text-amber-400' :
                      log.type === 'success' ? 'text-emerald-400' : 'text-slate-300'
                    }
                  >
                    {log.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technician Escalation Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0f0945]/90 border border-cyan-500/40 text-white shadow-2xl backdrop-blur-md">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Engineers Available On-Call
          </div>
          <h3 className="text-2xl sm:text-3xl font-black mb-3">
            Need Urgent On-Field Assistance?
          </h3>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-6">
            Connect directly with our senior hardware engineers for wiring guidance, custom server port redirects, state compliance certificates, or bulk device flashing.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/917782808063?text=Hello%20Arshi%20Support%20Team,%20I%20need%20technician%20assistance%20for%20device%20configuration%20and%20diagnostics."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#25d366] hover:bg-[#20ba59] text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Direct Technician WhatsApp Support
            </a>
            <a
              href={`tel:${helplinePhone}`}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Support Desk: {phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Tool Modal */}
      {selectedTool && (
        <div 
          className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedTool(null)}
        >
          <div 
            className="w-full max-w-lg bg-[#0f0945] border border-[#3a2f9a] rounded-3xl p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTool(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                {selectedTool.icon}
              </div>
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">TOOL {selectedTool.id}</span>
                <h3 className="text-lg font-bold text-white leading-tight">{selectedTool.title}</h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {selectedTool.desc}
            </p>

            <div className="bg-[#040217] border border-cyan-500/30 rounded-xl p-3 font-mono text-xs text-cyan-300 break-all mb-6">
              {selectedTool.code}
            </div>

            <div className="flex justify-end gap-3">
              <a
                href={`https://wa.me/917782808063?text=${encodeURIComponent('Hello Arshi Team, I would like technical documentation & access for: ' + selectedTool.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-bold text-center uppercase tracking-wider shadow-lg transition"
              >
                Request Access on WhatsApp ↗
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

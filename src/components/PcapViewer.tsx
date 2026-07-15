'use client';

import { ChevronDown, ChevronRight, Filter, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

// PCAP packet data structure (pre-processed from .pcap files to JSON)
export interface PcapPacket {
  number: number;
  timestamp: string;
  source: string;
  destination: string;
  protocol: string;
  length: number;
  info: string;
  layers: PacketLayer[];
  hexDump?: string;
}

export interface PacketLayer {
  name: string;
  fields: PacketField[];
}

export interface PacketField {
  name: string;
  value: string;
  description?: string;
  highlight?: boolean; // highlight important fields for the lab
}

export interface PcapData {
  filename: string;
  description: string;
  captureInfo: {
    interface: string;
    duration: string;
    packetCount: number;
    captureFilter?: string;
  };
  packets: PcapPacket[];
}

// Protocol color mapping (matches Wireshark conventions)
const PROTOCOL_COLORS: Record<string, string> = {
  TCP: 'bg-purple-50 border-purple-200 text-purple-900',
  UDP: 'bg-blue-50 border-blue-200 text-blue-900',
  DNS: 'bg-blue-50 border-blue-200 text-blue-900',
  HTTP: 'bg-green-50 border-green-200 text-green-900',
  HTTPS: 'bg-green-100 border-green-300 text-green-900',
  TLS: 'bg-green-100 border-green-300 text-green-900',
  DHCP: 'bg-yellow-50 border-yellow-200 text-yellow-900',
  ARP: 'bg-orange-50 border-orange-200 text-orange-900',
  ICMP: 'bg-pink-50 border-pink-200 text-pink-900',
  OSPF: 'bg-teal-50 border-teal-200 text-teal-900',
  STP: 'bg-gray-50 border-gray-200 text-gray-900',
  'IEEE 802.1Q': 'bg-indigo-50 border-indigo-200 text-indigo-900',
};

function getProtocolColor(protocol: string): string {
  return PROTOCOL_COLORS[protocol] || 'bg-gray-50 border-gray-200 text-gray-800';
}

interface PcapViewerProps {
  data: PcapData;
  highlightPackets?: number[]; // packet numbers to highlight (for lab questions)
  className?: string;
}

export default function PcapViewer({
  data,
  highlightPackets = [],
  className = '',
}: PcapViewerProps) {
  const [selectedPacket, setSelectedPacket] = useState<PcapPacket | null>(null);
  const [expandedLayers, setExpandedLayers] = useState<Set<string>>(new Set());
  const [filterText, setFilterText] = useState('');
  const [protocolFilter, setProtocolFilter] = useState<string>('');
  const [showHexDump, setShowHexDump] = useState(false);

  // Get unique protocols for filter dropdown
  const protocols = useMemo(() => {
    const set = new Set(data.packets.map((p) => p.protocol));
    return Array.from(set).sort();
  }, [data.packets]);

  // Filter packets
  const filteredPackets = useMemo(() => {
    return data.packets.filter((p) => {
      if (protocolFilter && p.protocol !== protocolFilter) return false;
      if (filterText) {
        const lower = filterText.toLowerCase();
        return (
          p.source.toLowerCase().includes(lower) ||
          p.destination.toLowerCase().includes(lower) ||
          p.protocol.toLowerCase().includes(lower) ||
          p.info.toLowerCase().includes(lower) ||
          String(p.number).includes(lower)
        );
      }
      return true;
    });
  }, [data.packets, protocolFilter, filterText]);

  const toggleLayer = (layerName: string) => {
    setExpandedLayers((prev) => {
      const next = new Set(prev);
      if (next.has(layerName)) next.delete(layerName);
      else next.add(layerName);
      return next;
    });
  };

  return (
    <div
      className={`rounded-xl border border-gray-300 bg-white shadow-lg overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="bg-gray-800 text-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm">📦 Packet Capture: {data.filename}</h3>
            <p className="text-xs text-gray-300 mt-0.5">{data.description}</p>
          </div>
          <div className="text-xs text-gray-400">
            {data.captureInfo.packetCount} packets • {data.captureInfo.duration}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Filter packets (IP, protocol, info...)"
            className="w-full pl-7 pr-3 py-1.5 text-xs border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
          />
        </div>
        <div className="flex items-center gap-1">
          <Filter className="h-3.5 w-3.5 text-gray-400" />
          <select
            value={protocolFilter}
            onChange={(e) => setProtocolFilter(e.target.value)}
            className="text-xs border border-gray-300 rounded px-2 py-1.5 bg-white text-gray-700"
          >
            <option value="">All Protocols</option>
            {protocols.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Packet List */}
      <div className="max-h-[300px] overflow-y-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-2 py-1.5 text-left font-semibold text-gray-600 w-12">No.</th>
              <th className="px-2 py-1.5 text-left font-semibold text-gray-600 w-20">Time</th>
              <th className="px-2 py-1.5 text-left font-semibold text-gray-600">Source</th>
              <th className="px-2 py-1.5 text-left font-semibold text-gray-600">Destination</th>
              <th className="px-2 py-1.5 text-left font-semibold text-gray-600 w-16">Protocol</th>
              <th className="px-2 py-1.5 text-left font-semibold text-gray-600 w-12">Len</th>
              <th className="px-2 py-1.5 text-left font-semibold text-gray-600">Info</th>
            </tr>
          </thead>
          <tbody>
            {filteredPackets.map((packet) => {
              const isSelected = selectedPacket?.number === packet.number;
              const isHighlighted = highlightPackets.includes(packet.number);
              const colorClass = getProtocolColor(packet.protocol);

              return (
                <tr
                  key={packet.number}
                  onClick={() => setSelectedPacket(isSelected ? null : packet)}
                  className={`cursor-pointer border-b border-gray-100 transition-colors
                    ${isSelected ? 'bg-blue-200 border-blue-300' : ''}
                    ${isHighlighted && !isSelected ? 'ring-2 ring-inset ring-amber-400' : ''}
                    ${!isSelected ? colorClass : ''}
                    hover:bg-blue-100`}
                >
                  <td className="px-2 py-1 font-mono">{packet.number}</td>
                  <td className="px-2 py-1 font-mono">{packet.timestamp}</td>
                  <td className="px-2 py-1 font-mono">{packet.source}</td>
                  <td className="px-2 py-1 font-mono">{packet.destination}</td>
                  <td className="px-2 py-1">
                    <span className="font-semibold">{packet.protocol}</span>
                  </td>
                  <td className="px-2 py-1 font-mono">{packet.length}</td>
                  <td className="px-2 py-1 truncate max-w-[300px]">{packet.info}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Packet Detail Panel */}
      {selectedPacket && (
        <div className="border-t-2 border-blue-400">
          <div className="bg-blue-50 px-4 py-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-blue-900">
              Packet #{selectedPacket.number} — {selectedPacket.protocol}
            </span>
            <button
              type="button"
              onClick={() => setShowHexDump(!showHexDump)}
              className="text-xs text-blue-600 hover:text-blue-800 underline"
            >
              {showHexDump ? 'Hide Hex' : 'Show Hex'}
            </button>
          </div>

          {/* Layer Tree */}
          <div className="max-h-[250px] overflow-y-auto p-2 space-y-1">
            {selectedPacket.layers.map((layer) => {
              const isExpanded = expandedLayers.has(layer.name);
              return (
                <div key={layer.name} className="border border-gray-200 rounded">
                  <button
                    type="button"
                    onClick={() => toggleLayer(layer.name)}
                    className="w-full flex items-center gap-1 px-2 py-1.5 text-xs font-semibold text-gray-800 hover:bg-gray-50"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
                    )}
                    {layer.name}
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-2 space-y-0.5">
                      {layer.fields.map((field) => (
                        <div
                          key={`${field.name}-${field.value}`}
                          className={`flex text-xs font-mono ${field.highlight ? 'bg-yellow-100 px-1 rounded font-bold' : ''}`}
                        >
                          <span className="text-gray-500 w-48 flex-shrink-0">{field.name}:</span>
                          <span className="text-gray-900">{field.value}</span>
                          {field.description && (
                            <span className="text-gray-400 ml-2 italic">({field.description})</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Hex Dump */}
          {showHexDump && selectedPacket.hexDump && (
            <div className="border-t border-gray-200 p-2">
              <pre className="text-xs font-mono text-gray-600 whitespace-pre bg-gray-50 p-2 rounded max-h-[100px] overflow-y-auto">
                {selectedPacket.hexDump}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Globe,
    Shield,
    Zap,
    TrendingUp,
    Users,
    Compass,
    CheckCircle2,
    Lightbulb,
    ArrowRight,
    Maximize2,
    LayoutGrid,
    Network,
    ListOrdered,
    GitCommit,
    ChevronDown,
    ChevronUp,
    ArrowDown
} from 'lucide-react';

export interface MindMapBranch {
    number: number;
    title: string;
    color: string; // Tailwind border/bg color identifier
    headerBg: string;
    badgeBg: string;
    icon: React.ReactNode;
    items: {
        title: string;
        description: string;
        badge?: string;
    }[];
    table?: {
        headerA: string;
        headerB: string;
        rows: { colA: string; colB: string }[];
    };
    footerNote?: string;
}

export interface InteractiveMindMapData {
    centralTitle: string;
    centralSubtitle: string;
    category: string;
    date: string;
    keyTakeaway: string;
    branches: MindMapBranch[];
}

export const TODAY_DYNAMIC_MIND_MAP: InteractiveMindMapData = {
    centralTitle: 'HOW INDIA IS SHAPING GLOBAL GOVERNANCE',
    centralSubtitle: 'STRATEGIC AUTONOMY & GLOBAL SOUTH LEADERSHIP IN MULTIPOLAR ORDER',
    category: 'INDIAN POLITY & INTERNATIONAL RELATIONS',
    date: '2026-08-11',
    keyTakeaway: 'India transitions from a rule-taker to a rule-shaper through Multi-Alignment, Digital Public Infrastructure export, and Global South leadership—essential for GS Paper 2 IR Mains.',
    branches: [
        {
            number: 1,
            title: 'CORE PRINCIPLES',
            color: 'blue',
            headerBg: 'bg-blue-600 text-white',
            badgeBg: 'bg-blue-500/20 text-blue-300',
            icon: <Shield className="w-5 h-5 text-white" />,
            items: [
                {
                    title: 'Strategic Autonomy',
                    description: 'Independent foreign policy guided by national interests without joining military alliances.'
                },
                {
                    title: 'Vasudhaiva Kutumbakam',
                    description: 'The world is one family—promoting collective development and inclusive growth.'
                },
                {
                    title: 'Rule of Law & Sovereignty',
                    description: 'Strict adherence to international law, maritime freedom, and non-violation of territorial boundaries.'
                },
                {
                    title: 'Consensus Building',
                    description: 'Resolving international friction through peaceful diplomacy, dialogue, and mutual agreement.'
                }
            ],
            footerNote: 'Promotes inclusive democratic values tailored to developing nation needs.'
        },
        {
            number: 2,
            title: 'STRATEGY: REFORMED MULTILATERALISM',
            color: 'emerald',
            headerBg: 'bg-emerald-600 text-white',
            badgeBg: 'bg-emerald-500/20 text-emerald-300',
            icon: <Zap className="w-5 h-5 text-white" />,
            items: [
                {
                    title: 'UN Security Council Reforms',
                    description: 'Actively advocating for expanded permanent seat representation for developing countries.'
                },
                {
                    title: 'Voice of Global South',
                    description: 'Hosting summits to bring food security, energy access, and climate finance to global forums.'
                },
                {
                    title: 'G20 Permanent AU Seat',
                    description: 'Successfully inducted the African Union into G20 to democratize global decision making.'
                }
            ]
        },
        {
            number: 3,
            title: 'KEY INITIATIVES & CORRIDORS',
            color: 'purple',
            headerBg: 'bg-purple-600 text-white',
            badgeBg: 'bg-purple-500/20 text-purple-300',
            icon: <Globe className="w-5 h-5 text-white" />,
            items: [
                {
                    title: 'IMEC Corridor',
                    description: 'India-Middle East-Europe Economic Corridor boosting sustainable connectivity & trade.',
                    badge: 'CONNECTIVITY'
                },
                {
                    title: 'International Solar Alliance (ISA)',
                    description: 'Global coalition mobilising $1 Trillion solar energy investments for developing states.',
                    badge: 'CLIMATE'
                },
                {
                    title: 'CDRI & UPI Global',
                    description: 'Coalition for Disaster Resilient Infrastructure & cross-border UPI digital payments.',
                    badge: 'TECH EXPORT'
                }
            ],
            footerNote: 'Expands India\'s soft power and high-yield strategic partnerships worldwide.'
        },
        {
            number: 4,
            title: 'FOCUS ON GLOBAL SOUTH',
            color: 'amber',
            headerBg: 'bg-amber-600 text-dark',
            badgeBg: 'bg-amber-500/20 text-amber-300',
            icon: <Users className="w-5 h-5 text-dark" />,
            items: [
                {
                    title: 'Digital Public Infrastructure (DPI)',
                    description: 'Exporting open-source stacks like Aadhaar, UPI, and DigiLocker to emerging economies.'
                },
                {
                    title: 'Debt Relief & Food Security',
                    description: 'Providing concessional credit lines, wheat shipments, and fertilizer aid during crises.'
                },
                {
                    title: 'Humanitarian Assistance (HADR)',
                    description: 'First responder during natural disasters in the Indian Ocean Region (Operation Dost, Operation Karuna).'
                }
            ]
        },
        {
            number: 5,
            title: 'INSTITUTIONAL IMPACT',
            color: 'rose',
            headerBg: 'bg-rose-600 text-white',
            badgeBg: 'bg-rose-500/20 text-rose-300',
            icon: <TrendingUp className="w-5 h-5 text-white" />,
            items: [
                {
                    title: 'Local Currency Settlements',
                    description: 'Bilateral trade agreements in INR-Dirham/Rupiah to de-risk currency volatility.'
                },
                {
                    title: 'BRICS Expansion Leadership',
                    description: 'Welcoming new global members while preserving balanced non-western consensus.'
                },
                {
                    title: 'Diversified Supply Chains',
                    description: 'Building resilient semiconductor & critical mineral alliances via Quad & IPEF.'
                }
            ]
        },
        {
            number: 6,
            title: 'APPROACH COMPARISON',
            color: 'cyan',
            headerBg: 'bg-cyan-600 text-dark',
            badgeBg: 'bg-cyan-500/20 text-cyan-300',
            icon: <Compass className="w-5 h-5 text-dark" />,
            items: [],
            table: {
                headerA: 'INDIA MODEL',
                headerB: 'TRADITIONAL BLOCS',
                rows: [
                    { colA: 'Human-Centric Development', colB: 'Conditionality-Driven Loans' },
                    { colA: 'Open Technology Stacks', colB: 'Proprietary IP Enclaves' },
                    { colA: 'Multi-Alignment & Autonomy', colB: 'Rigid Security Pacts' },
                    { colA: 'Consensus & Dialogue', colB: 'Unilateral Sanctions' }
                ]
            }
        }
    ]
};

interface InteractiveMindMapProps {
    data?: InteractiveMindMapData;
    onExpandLightbox?: () => void;
}

export type LayoutMode = 'grid' | 'radial' | 'flowchart' | 'accordion';

export const InteractiveMindMap: React.FC<InteractiveMindMapProps> = ({
    data = TODAY_DYNAMIC_MIND_MAP,
    onExpandLightbox
}) => {
    const [selectedBranchNum, setSelectedBranchNum] = useState<number | null>(null);
    const [layoutMode, setLayoutMode] = useState<LayoutMode>('grid');
    const [expandedAccordion, setExpandedAccordion] = useState<number | null>(1);

    const getBranchCardBg = (color: string) => {
        switch (color) {
            case 'blue': return 'border-blue-500 bg-blue-50/90 text-blue-900';
            case 'emerald': return 'border-emerald-500 bg-emerald-50/90 text-emerald-900';
            case 'purple': return 'border-purple-500 bg-purple-50/90 text-purple-900';
            case 'amber': return 'border-amber-500 bg-amber-50/90 text-amber-900';
            case 'rose': return 'border-rose-500 bg-rose-50/90 text-rose-900';
            case 'cyan': return 'border-cyan-500 bg-cyan-50/90 text-cyan-900';
            default: return 'border-gray-500 bg-gray-50/90 text-gray-900';
        }
    };

    return (
        <div className="w-full bg-slate-900 rounded-3xl p-4 sm:p-8 text-white border-4 border-dark shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden font-sans">
            {/* BACKGROUND GRAPH GRID */}
            <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* HEADER BAR WITH 4 LAYOUT VIEW SWITCHER TABS */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4 relative z-10">
                <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] sm:text-xs font-black uppercase tracking-widest border border-primary/30">
                        ⚡ DAILY INTERACTIVE MIND MAP • {data.date}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black !text-white text-white font-display mt-1">
                        {data.category}
                    </h2>
                </div>

                {/* LAYOUT VIEW SELECTOR TABS */}
                <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
                    <button
                        onClick={() => setLayoutMode('grid')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${layoutMode === 'grid'
                                ? 'bg-primary text-dark shadow-md'
                                : 'text-slate-400 hover:text-white'
                            }`}
                        title="3-Column Grid View"
                    >
                        <LayoutGrid size={14} /> Grid
                    </button>

                    <button
                        onClick={() => setLayoutMode('radial')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${layoutMode === 'radial'
                                ? 'bg-primary text-dark shadow-md'
                                : 'text-slate-400 hover:text-white'
                            }`}
                        title="Radial Canvas Mind Map"
                    >
                        <Network size={14} /> Radial Canvas
                    </button>

                    <button
                        onClick={() => setLayoutMode('flowchart')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${layoutMode === 'flowchart'
                                ? 'bg-primary text-dark shadow-md'
                                : 'text-slate-400 hover:text-white'
                            }`}
                        title="Flowchart Timeline View"
                    >
                        <ListOrdered size={14} /> Timeline
                    </button>

                    <button
                        onClick={() => setLayoutMode('accordion')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${layoutMode === 'accordion'
                                ? 'bg-primary text-dark shadow-md'
                                : 'text-slate-400 hover:text-white'
                            }`}
                        title="Accordion Focus View"
                    >
                        <GitCommit size={14} /> Accordion
                    </button>

                    {onExpandLightbox && (
                        <button
                            onClick={onExpandLightbox}
                            className="ml-2 p-2 rounded-xl bg-slate-800 text-primary hover:bg-primary hover:text-dark transition-all cursor-pointer"
                            title="Fullscreen Lightbox"
                        >
                            <Maximize2 size={14} />
                        </button>
                    )}
                </div>
            </div>

            {/* CENTER NODE */}
            <div className="flex justify-center mb-8 relative z-10">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-xl w-full bg-gradient-to-br from-slate-950 via-dark to-slate-900 border-4 border-primary p-6 rounded-3xl text-center shadow-[0_0_30px_rgba(245,166,35,0.3)] relative group"
                >
                    <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-inner">
                        <Globe className="w-8 h-8 animate-pulse" />
                    </div>
                    <div className="text-lg sm:text-2xl font-black tracking-tight !text-white text-white font-display uppercase leading-snug">
                        {data.centralTitle}
                    </div>
                    <p className="text-xs text-primary font-bold tracking-widest mt-1.5 uppercase">
                        {data.centralSubtitle}
                    </p>
                </motion.div>
            </div>

            {/* ========================================================================= */}
            {/* VIEW MODE 1: 3-COLUMN GRID LAYOUT (DEFAULT) */}
            {/* ========================================================================= */}
            {layoutMode === 'grid' && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 mb-8"
                >
                    {data.branches.map((branch) => {
                        const isSelected = selectedBranchNum === branch.number;

                        return (
                            <motion.div
                                key={branch.number}
                                layout
                                onClick={() => setSelectedBranchNum(isSelected ? null : branch.number)}
                                className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden cursor-pointer shadow-lg flex flex-col justify-between ${getBranchCardBg(
                                    branch.color
                                )} ${isSelected ? 'ring-4 ring-primary scale-[1.02] shadow-2xl' : ''}`}
                            >
                                <div>
                                    <div className={`px-4 py-3 font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-between ${branch.headerBg}`}>
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-black text-xs">
                                                {branch.number}
                                            </span>
                                            <span className="font-display truncate">{branch.title}</span>
                                        </div>
                                        {branch.icon}
                                    </div>

                                    <div className="p-4 space-y-3 text-slate-800">
                                        {branch.items.map((item, idx) => (
                                            <div key={idx} className="bg-white/80 p-3 rounded-xl border border-slate-200/80 shadow-xs hover:bg-white transition-colors">
                                                <div className="flex items-start justify-between gap-2 mb-1">
                                                    <h4 className="text-xs font-black text-slate-900 leading-snug flex items-center gap-1.5">
                                                        <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                                                        {item.title}
                                                    </h4>
                                                    {item.badge && (
                                                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-900 text-primary shrink-0">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-[11px] text-slate-600 font-medium leading-relaxed pl-4">
                                                    {item.description}
                                                </p>
                                            </div>
                                        ))}

                                        {branch.table && (
                                            <div className="bg-white rounded-xl overflow-hidden border border-slate-300 text-[11px]">
                                                <div className="grid grid-cols-2 bg-slate-900 text-white font-black text-[10px] uppercase p-2 text-center">
                                                    <div>{branch.table.headerA}</div>
                                                    <div className="border-l border-slate-700">{branch.table.headerB}</div>
                                                </div>
                                                {branch.table.rows.map((row, rIdx) => (
                                                    <div
                                                        key={rIdx}
                                                        className={`grid grid-cols-2 p-2 font-medium border-t border-slate-200 ${rIdx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}
                                                    >
                                                        <div className="text-slate-900 font-bold pr-1">{row.colA}</div>
                                                        <div className="text-slate-600 pl-1 border-l border-slate-200">{row.colB}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {branch.footerNote && (
                                    <div className="px-4 py-2.5 bg-slate-900/90 text-primary text-[10px] font-bold tracking-wide border-t border-slate-800 flex items-center gap-1.5">
                                        <ArrowRight size={12} className="shrink-0" />
                                        <span>{branch.footerNote}</span>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}

            {/* ========================================================================= */}
            {/* VIEW MODE 2: RADIAL CANVAS MIND MAP (TRUE VISUAL NODE GRAPH) */}
            {/* ========================================================================= */}
            {layoutMode === 'radial' && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 mb-8 p-6 bg-slate-950/80 rounded-3xl border border-slate-800"
                >
                    <div className="text-center mb-6">
                        <span className="px-3 py-1 bg-primary/20 text-primary font-black text-xs uppercase tracking-widest rounded-full border border-primary/30">
                            🌳 Interactive Hub & Spoke Tree • Click Any Pillar Orb
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                        {data.branches.map((branch) => {
                            const isSelected = selectedBranchNum === branch.number;
                            return (
                                <motion.div
                                    key={branch.number}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => setSelectedBranchNum(isSelected ? null : branch.number)}
                                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${getBranchCardBg(branch.color)} ${isSelected ? 'ring-4 ring-primary shadow-2xl' : ''
                                        }`}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-md ${branch.headerBg}`}>
                                            #{branch.number}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-xs sm:text-sm text-slate-900 font-display">
                                                {branch.title}
                                            </h3>
                                            <span className="text-[10px] font-bold text-slate-600">
                                                {branch.items.length} High-Yield Concepts
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {branch.items.slice(0, 2).map((item, i) => (
                                            <div key={i} className="text-[11px] font-bold text-slate-800 bg-white/90 p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                                                <span>• {item.title}</span>
                                                {item.badge && (
                                                    <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-slate-900 text-primary">
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            )}

            {/* ========================================================================= */}
            {/* VIEW MODE 3: FLOWCHART TIMELINE VIEW */}
            {/* ========================================================================= */}
            {layoutMode === 'flowchart' && (
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative z-10 mb-8 space-y-6 max-w-4xl mx-auto"
                >
                    {data.branches.map((branch, index) => (
                        <div key={branch.number} className="relative">
                            <div className={`p-5 rounded-2xl border-2 ${getBranchCardBg(branch.color)} shadow-lg`}>
                                <div className={`px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-between mb-4 ${branch.headerBg}`}>
                                    <div className="flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-black text-xs">
                                            Step {branch.number}
                                        </span>
                                        <span className="font-display">{branch.title}</span>
                                    </div>
                                    {branch.icon}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {branch.items.map((item, idx) => (
                                        <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200">
                                            <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                                                <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                                                {item.title}
                                            </h4>
                                            <p className="text-[11px] text-slate-600 mt-1 font-medium leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {index < data.branches.length - 1 && (
                                <div className="flex justify-center my-3">
                                    <div className="w-8 h-8 rounded-full bg-primary text-dark flex items-center justify-center border-2 border-dark shadow-sm">
                                        <ArrowDown size={18} className="animate-bounce" />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </motion.div>
            )}

            {/* ========================================================================= */}
            {/* VIEW MODE 4: ACCORDION DEEP-DIVE VIEW */}
            {/* ========================================================================= */}
            {layoutMode === 'accordion' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative z-10 mb-8 space-y-4 max-w-4xl mx-auto"
                >
                    {data.branches.map((branch) => {
                        const isOpen = expandedAccordion === branch.number;
                        return (
                            <div
                                key={branch.number}
                                className="rounded-2xl border-2 border-slate-800 bg-slate-950 overflow-hidden"
                            >
                                <button
                                    onClick={() => setExpandedAccordion(isOpen ? null : branch.number)}
                                    className={`w-full px-5 py-4 font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-between text-left transition-colors cursor-pointer ${isOpen ? branch.headerBg : 'bg-slate-900 text-white hover:bg-slate-800'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-black text-xs">
                                            {branch.number}
                                        </span>
                                        <span className="font-display text-sm">{branch.title}</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {branch.icon}
                                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="p-5 bg-slate-900 text-slate-800 space-y-3"
                                        >
                                            <div className={`p-4 rounded-xl border-2 ${getBranchCardBg(branch.color)} space-y-3`}>
                                                {branch.items.map((item, idx) => (
                                                    <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200">
                                                        <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                                                            <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                                                            {item.title}
                                                        </h4>
                                                        <p className="text-[11px] text-slate-600 mt-1 font-medium leading-relaxed">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                ))}

                                                {branch.table && (
                                                    <div className="bg-white rounded-xl overflow-hidden border border-slate-300 text-[11px]">
                                                        <div className="grid grid-cols-2 bg-slate-900 text-white font-black text-[10px] uppercase p-2 text-center">
                                                            <div>{branch.table.headerA}</div>
                                                            <div className="border-l border-slate-700">{branch.table.headerB}</div>
                                                        </div>
                                                        {branch.table.rows.map((row, rIdx) => (
                                                            <div
                                                                key={rIdx}
                                                                className={`grid grid-cols-2 p-2 font-medium border-t border-slate-200 ${rIdx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}
                                                            >
                                                                <div className="text-slate-900 font-bold pr-1">{row.colA}</div>
                                                                <div className="text-slate-600 pl-1 border-l border-slate-200">{row.colB}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </motion.div>
            )}

            {/* BOTTOM KEY TAKEAWAY BANNER */}
            <div className="relative z-10 bg-gradient-to-r from-primary via-amber-400 to-amber-500 text-dark p-4 sm:p-5 rounded-2xl border-2 border-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-start gap-3">
                <div className="p-2.5 bg-dark text-primary rounded-xl shrink-0 mt-0.5">
                    <Lightbulb size={22} className="animate-bounce" />
                </div>
                <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-dark font-display mb-1">
                        EXAM KEY TAKEAWAY SYNTHESIS
                    </h3>
                    <p className="text-xs sm:text-sm font-extrabold text-dark leading-relaxed">
                        {data.keyTakeaway}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InteractiveMindMap;

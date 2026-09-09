import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import { MindMapItem } from '../data/mindMapsData';

interface MindMapCalendarProps {
    mindMaps: MindMapItem[];
    selectedDate?: string;
    onSelectMindMap: (item: MindMapItem) => void;
    className?: string;
}

export const MindMapCalendar: React.FC<MindMapCalendarProps> = ({
    mindMaps,
    selectedDate,
    onSelectMindMap,
    className = ''
}) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Map of YYYY-MM-DD -> MindMapItem
    const mapDateToItem = new Map<string, MindMapItem>();
    mindMaps.forEach((item) => {
        mapDateToItem.set(item.date, item);
    });

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const days = [];
    // Empty slots before 1st of month
    for (let i = 0; i < firstDayOfWeek; i++) {
        days.push(null);
    }
    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
        days.push(day);
    }

    const formatDateStr = (dayNum: number) => {
        const m = String(month + 1).padStart(2, '0');
        const d = String(dayNum).padStart(2, '0');
        return `${year}-${m}-${d}`;
    };

    return (
        <div className={`bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-gray-100 max-w-[310px] ${className}`}>
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                        <CalendarIcon size={16} />
                    </div>
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-dark">
                            {monthNames[month]} {year}
                        </h4>
                        <p className="text-[10px] text-gray-400 font-medium">Mind Map Calendar</p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={handlePrevMonth}
                        className="p-1 rounded-md hover:bg-gray-100 text-gray-600 transition-colors"
                        title="Previous Month"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={handleNextMonth}
                        className="p-1 rounded-md hover:bg-gray-100 text-gray-600 transition-colors"
                        title="Next Month"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 text-center mb-1">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((wd) => (
                    <span key={wd} className="text-[10px] font-bold text-gray-400 uppercase">
                        {wd}
                    </span>
                ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
                {days.map((dayNum, index) => {
                    if (dayNum === null) {
                        return <div key={`empty-${index}`} className="h-8" />;
                    }

                    const dateStr = formatDateStr(dayNum);
                    const mindMapItem = mapDateToItem.get(dateStr);
                    const hasMap = !!mindMapItem;
                    const isSelected = selectedDate === dateStr;

                    return (
                        <button
                            key={dateStr}
                            disabled={!hasMap}
                            onClick={() => {
                                if (mindMapItem) {
                                    onSelectMindMap(mindMapItem);
                                }
                            }}
                            className={`h-8 w-8 mx-auto rounded-xl text-xs font-semibold flex flex-col items-center justify-center relative transition-all duration-200 ${isSelected
                                    ? 'bg-primary text-dark font-extrabold shadow-md scale-105 ring-2 ring-primary/40'
                                    : hasMap
                                        ? 'bg-amber-50 text-amber-900 border border-amber-300/60 hover:bg-amber-100 hover:scale-105 cursor-pointer shadow-sm'
                                        : 'text-gray-400 hover:text-gray-600 cursor-default opacity-60'
                                }`}
                        >
                            <span>{dayNum}</span>
                            {hasMap && !isSelected && (
                                <span className="w-1.5 h-1.5 rounded-full bg-primary absolute bottom-1 animate-pulse" />
                            )}
                            {isSelected && (
                                <Sparkles size={10} className="absolute -top-1 -right-1 text-dark" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Footer Info */}
            <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1 text-amber-700 font-medium">
                    <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                    Available Mind Maps
                </div>
                <span className="text-gray-400 font-bold">{mindMaps.length} Total</span>
            </div>
        </div>
    );
};

export default MindMapCalendar;

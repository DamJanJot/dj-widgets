import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarDay {
    date: number;
    isCurrentMonth: boolean;
}

export default function MiniCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const getPrevMonthDays = (date: Date) => {
        const prevDate = new Date(date.getFullYear(), date.getMonth(), 0);
        const daysInPrevMonth = getDaysInMonth(prevDate);
        const firstDay = getFirstDayOfMonth(date);
        const daysToShow = firstDay === 0 ? 6 : firstDay - 1; // Poniedziałek jako pierwszy

        return Array.from({ length: daysToShow }, (_, i) => ({
            date: daysInPrevMonth - daysToShow + i + 1,
            isCurrentMonth: false,
        }));
    };

    const getCurrentMonthDays = (date: Date) => {
        const daysInMonth = getDaysInMonth(date);
        return Array.from({ length: daysInMonth }, (_, i) => ({
            date: i + 1,
            isCurrentMonth: true,
        }));
    };

    const getNextMonthDays = (calendarDays: CalendarDay[]) => {
        const totalCells = 42; // 6 wierszy x 7 kolumn
        const remainingCells = totalCells - calendarDays.length;
        return Array.from({ length: remainingCells }, (_, i) => ({
            date: i + 1,
            isCurrentMonth: false,
        }));
    };

    const prevDays = getPrevMonthDays(currentDate);
    const currDays = getCurrentMonthDays(currentDate);
    const nextDays = getNextMonthDays([...prevDays, ...currDays]);
    const allDays = [...prevDays, ...currDays, ...nextDays];

    const monthName = currentDate.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' });
    const today = new Date();
    const isCurrentMonth = today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();

    const handlePrev = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNext = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    return (
        <div className="widget mini-calendar">
            <div className="mini-calendar-header">
                <button onClick={handlePrev} className="btn-icon mini-calendar-nav" aria-label="Poprzedni miesiac">
                    <ChevronLeft size={18} />
                </button>
                <h3 className="mini-calendar-title">{monthName}</h3>
                <button onClick={handleNext} className="btn-icon mini-calendar-nav" aria-label="Nastepny miesiac">
                    <ChevronRight size={18} />
                </button>
            </div>

            <div className="mini-calendar-grid">
                {['Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'Sb', 'Nd'].map((day) => (
                    <div key={day} className="mini-calendar-weekday">
                        {day}
                    </div>
                ))}

                {allDays.map((day, idx) => {
                    const isToday = isCurrentMonth && day.isCurrentMonth && day.date === today.getDate();
                    return (
                        <div
                            key={idx}
                            className={`mini-calendar-day ${
                                day.isCurrentMonth ? 'mini-calendar-day-current' : 'mini-calendar-day-outside'
                            } ${isToday ? 'mini-calendar-day-today' : ''}`}
                        >
                            {day.date}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

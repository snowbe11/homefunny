import { useState } from "react";
import { Calendar as CalendarG } from "grommet";

export const Calendar = (props: { setNewDate: any }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDateChanged = (date: Date) => {
    if (date) {
      setSelectedDate(date);
      props.setNewDate(date);
    }
  };

  return (
    <div className="bath-calendar-container">
      <CalendarG
        firstDayOfWeek={1}
        date={selectedDate.toISOString()}
        onSelect={(arg) => {
          //console.log(arg);
          onDateChanged(new Date(arg.toLocaleString()));
        }}
      />
    </div>
  );
};

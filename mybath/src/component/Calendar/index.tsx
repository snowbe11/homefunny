import { Calendar as DatePicker } from "antd";

export const Calendar = (props: { setNewDate: any }) => {
  const onDateChanged = (date: Date) => {
    if (date) {
      props.setNewDate(date);
    }
  };

  return (
    <div className="bath-calendar-container">
      <DatePicker
        fullscreen={false}
        onSelect={(date: any) => onDateChanged(new Date(date))}
      />
    </div>
  );
};

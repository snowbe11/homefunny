import { Calendar as DatePicker } from "antd";

export const Calendar = (props: { setNewDate: any }) => {
  const onDateChanged = (date: Date) => {
    props.setNewDate(date);
  };

  return (
    <div className="bath-calendar-container">
      <DatePicker
        fullscreen={false}
        onSelect={(date: moment.Moment) => {
          onDateChanged(date.toDate());
        }}
      />
    </div>
  );
};

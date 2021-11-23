import { DatePicker } from "antd";
import moment from "moment";

export const Calendar = (props: { setNewDate: any }) => {
  const onDateChanged = (date: Date) => {
    if (date) {
      props.setNewDate(date);
    }
  };

  const timePickerProps = {
    date: new Date(),
    highlightCurrentDay: true,
    reverseMonthAndYearMenus: false,
    shortcuts: false,
    showActionsBar: false,
    showTimeArrowButtons: false,
    timePrecision: undefined,
    useAmPm: false,
  };

  return (
    <div className="bath-calendar-container">
      <DatePicker
        dateRender={(current) => {
          const style = {};
          return (
            <div className="ant-picker-cell-inner" style={style}>
              {current.date()}
            </div>
          );
        }
      }
      onChange={(date:any, dateString:string) => onDateChanged(new Date(dateString))}

      />
    </div>
  );
};

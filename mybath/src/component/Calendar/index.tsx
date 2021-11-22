import { Classes } from '@blueprintjs/core';
import { DatePicker } from "@blueprintjs/datetime"

export const Calendar = (props:{setNewDate:any}) => {
    const onDateChanged = (date:Date) => {
        if (date) {
            props.setNewDate(date);
        }
    }

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
                className={Classes.ELEVATION_1}
                onChange={onDateChanged}
                {...timePickerProps}
            />
        </div>
    )
}

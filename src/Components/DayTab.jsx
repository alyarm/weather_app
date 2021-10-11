import React from "react"



function DayTab({date, icon, iconAlt, minTemp, maxTemp, isSelected, onClick, daysCount}) {

    const dateHandler = date => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        
        return `${days[new Date(date).getDay()]}, ${new Date(date).getDate()} ${monthNames[new Date(date).getMonth()]}`
    }

    

    return (
        <div 
            className={`day-tab ${isSelected ? "active" : ""} ${daysCount ? "four-plus" : ""}`}
            title={iconAlt}
            onClick={onClick}
        >
            <div className="day-tab__content">
                <div className="day-tab__date">
                    <span className="date">{dateHandler(date)}</span>
                    <span className="text"></span>
                </div>
                {daysCount > 4 && 
                    <div className="day-tab__icon">
                        <img className="img" src={icon} alt={iconAlt}/>
                    </div>
                }
                <div className="day-tab__temp">
                    <span className="min-temp">{minTemp}</span>
                    <span className="max-temp">{maxTemp}</span>
                </div>
            </div>
            {daysCount <= 4 &&
                <div className="day-tab__icon">
                    <img className="img" src={icon} alt={iconAlt} title={iconAlt}/>
                </div>
            } 
        </div>
    )
}

export default DayTab
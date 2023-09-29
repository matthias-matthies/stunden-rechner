"use client"

import {useEffect, useState} from 'react'



export default function Home() {
    const calcTime = (start, end) => {
        const startHour = start.slice(0, start.indexOf(":"))
        const startMinute = start.slice(start.indexOf(":")+1)

        const endHour = end.slice(0, end.indexOf(":"))
        const endMinute = end.slice(end.indexOf(":")+1)

        const workHour = endHour - startHour
        const workMinute = workHour * 60 + (endMinute - startMinute)

        console.log(workMinute)
        return workMinute
    }

    const [sum, setSum] = useState(0)
    const [times, setTimes] = useState([])

    useEffect(() => {
        setSum(
            times
                .map(time => time.work)
                .reduce((acc, curr) => {
                    return acc + curr
                }, 0)
        )
    }, [times])

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const timeObject = {
            start: formJson.start,
            end: formJson.end,
            day: formJson.day.slice(formJson.day.lastIndexOf("-")+1),
            work: calcTime(formJson.start, formJson.end)
        }

        setTimes([...times, timeObject])
    }

    function removeTime(index) {
        setTimes([...times.slice(0, index), ...times.slice(index + 1)]);
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="day">
                        Tag
                        <input name="day" id={`day`} type="date"  className={`p-2 border`}/>
                    </label>
                    <br />
                    <label htmlFor="start" className={`my-4`}>
                        Von
                        <input name="start" id={`start`} type="time" className={`p-2 border`}/>
                    </label>
                    <br />
                    <label htmlFor="end" className={`p-4`}>
                        Bis
                        <input name="end" id={`end`} type="time" className={`p-2 border`}/>
                    </label>
                    <br />
                    <input type="submit" value={`Hinzufügen`} className={`p-2 border`}/>
                </form>
            </div>
            <div>
                Display
                Sum: {sum} Minuten oder {sum/60} Stunden (Dezimal)
                <br />
                Rechne also {sum/60} * Stundenlohn
            </div>
            <div>
                <h3>Zeiten</h3>
                <ul>
                    {times.map((time, index) => {
                        return (
                            <li key={index} className={`font-mono my-2`}>
                                Tag {time.day.length == 2 ? time.day : "0"+time.day}: {time.start.length === 5 ? time.start :"0"+time.start} - {time.end.length === 5 ? time.end :"0"+time.end} - Arbeitszeit in Minuten: {time.work}
                                <button className={`p-2 border ml-2`} onClick={() => removeTime(index)}>Löschen</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </main>
    )
}

"use client";
import { useEffect, useState } from "react";
// import { dummyEvents } from "@/constants/dummyEvents";
import { useSearchParams } from "next/navigation";
import EventCard from "@/components/EventCard";
import React from "react";
import { useRouter } from "next/navigation";

export default function Events(){

    const searchParams = useSearchParams();
   
    const artistName = searchParams.get("artist");
    const tagName = searchParams.get("tag");

    const api = "https://qevent-backend.labs.crio.do/events";

    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    const router = useRouter();

    // const handleEventClick = (id) => {
       
    //     router.push(`/events?id`);
    // };
    

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(api);
                const data = await response.json();
                console.log(data);
                setEvents(data);

                if (artistName) {
                    const filtered = data.filter(event => event.artist === artistName);
                    setFilteredEvents(filtered);
                }else if(tagName){
                    const filtered = data.filter(event => event.tags && event.tags.includes(tagName));
                    setFilteredEvents(filtered);

                } else {
                    setFilteredEvents(data); 
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, [artistName, tagName]);

    return(
        <div>
            <div className="grid grid-cols-3">
                {filteredEvents.map((eventData) => (
            <EventCard key={eventData.id} eventData={eventData}/>
            ))}
            </div>
        </div>
     
    );
}
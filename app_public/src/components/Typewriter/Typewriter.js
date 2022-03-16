import React from "react";
import Typewriter from "typewriter-effect";

function TypeWriter() {
    return (
        <Typewriter
            options={{
                strings: [
                    "Track Expenses",
                    "Create Groups",
                    "Add Members",
                    "Create TODO List",

                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 20,
            }}
        />
    );
}

export default TypeWriter;


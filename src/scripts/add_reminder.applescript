-- on run argv
--     set dateString to date (item 2 of argv & " " & item 3 of argv)
--     tell application "Reminders"
--         make new reminder with properties { name: item 1 of argv, remind me date: dateString }
--         quit
--     end tell
-- end run

on run argv
    set dateString to date (item 4 of argv)
    tell application "Reminders"
        -- make new reminder with properties { name:"Title", remind me date:date "Sunday, May 6, 2018 at 2:00:00 PM" }
        make new reminder with properties { name: item 1 of argv, remind me date: dateString }
        -- quit
    end tell
end run

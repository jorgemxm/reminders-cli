on run argv
  tell application "Reminders"
    set currentReminder to get due date of last reminder whose name is item 1 of argv

    quit
    return date string of currentReminder & " " & time string of currentReminder
  end tell
end run
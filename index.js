const userId = "1149437523785957508"

fetch("https://api.lanyard.rest/v1/users/" + userId)
    .then(res => res.json())
    .then(data => {
        const user = data.data.discord_user
        const status = data.data.discord_status
        const activities = data.data.activities

        const avatarUrl = "https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar + ".png"

        document.getElementById("avatar").src = avatarUrl
        document.getElementById("name").textContent = user.display_name
        document.getElementById("status").textContent = status

        // Add status dot class
        const statusDot = document.getElementById("status-dot")
        statusDot.className = "status-dot " + status

        // Custom status (type 4)
        const customActivity = activities.find(a => a.type === 4)
        if (customActivity && customActivity.state) {
            document.getElementById("custom-status").textContent = customActivity.state
        }

        // Game activity (type 0) first, then music (type 2), then watching (type 3)
        const activitySection = document.getElementById("activity-section")
        const activityIcon = document.getElementById("activity-icon")
        const activityIconPlaceholder = document.getElementById("activity-icon-placeholder")

        const gameActivity = activities.find(a => a.type === 0)
        const musicActivity = activities.find(a => a.type === 2)
        const watchActivity = activities.find(a => a.type === 3)

        const currentActivity = gameActivity || musicActivity || watchActivity

        if (currentActivity) {
            // Show image icon, hide placeholder
            activityIcon.style.display = ""
            activityIconPlaceholder.style.display = "none"

            // Set activity icon
            if (currentActivity.assets && currentActivity.assets.large_image) {
                let iconUrl = currentActivity.assets.large_image
                if (iconUrl.startsWith("mp:")) {
                    iconUrl = "https://media.discordapp.net/" + iconUrl.slice(3)
                } else if (!iconUrl.startsWith("http")) {
                    iconUrl = "https://cdn.discordapp.com/app-assets/" + currentActivity.application_id + "/" + iconUrl + ".png"
                }
                activityIcon.src = iconUrl
            } else if (currentActivity.application_id) {
                activityIcon.src = "https://dcdn.dstn.to/app-icons/" + currentActivity.application_id
            }

            // Set activity name
            document.getElementById("activity-name").textContent = currentActivity.name

            // Set activity details
            if (currentActivity.details) {
                document.getElementById("activity-details").textContent = currentActivity.details
            }

            // Set activity state
            if (currentActivity.state) {
                document.getElementById("activity-state").textContent = currentActivity.state
            }
        } else {
            // No game activity - show music placeholder
            activityIcon.style.display = "none"
            activityIconPlaceholder.style.display = "flex"
            activityIconPlaceholder.innerHTML = '<i class="fa-brands fa-spotify"></i>'
            document.getElementById("activity-name").textContent = "Spotify"
            document.getElementById("activity-details").textContent = "Not playing anything"
            document.getElementById("activity-state").textContent = ""
        }
    })

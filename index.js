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

        const customActivity = activities.find(a => a.type === 4)
        if (customActivity) {
            document.getElementById("activity").textContent = customActivity.state
        }
    })
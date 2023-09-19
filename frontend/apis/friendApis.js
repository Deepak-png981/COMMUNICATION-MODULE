class FriendAPI {
    // Simulated data for demonstration purposes (replace with actual API calls)
    static async getFriends() {
        try {
            // Make an HTTP GET request to the API endpoint
            const response = await fetch('/users/');

            // Check if the response status is OK (200)
            if (response.status === 200) {
                // Parse the JSON response
                const data = await response.json();
                console.log(data);

                // Return the data from the API response in the specified format
                return data.map(user => ({
                    _id: user._id, // Assuming _id is the user's unique identifier
                    name: user.name,
                    profilePic: user.profilePicture,
                    publicKey: user.publicKey,
                    lastMessage: user.lastMessage || '', // Use an empty string if lastMessage is undefined
                    status: user.status || 'active', // Use 'active' if status is undefined
                }));
            } else {
                throw new Error('Failed to fetch friends from the API');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default FriendAPI;

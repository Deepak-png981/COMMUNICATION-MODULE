
import FriendAPI from '../apis/friendApis.js';

class FriendService {
    async getFriends() {
        try {
            // Call the API to fetch friends
            const friends = await FriendAPI.getFriends();
            return friends;
        } catch (error) {
            console.error("FriendService - Error fetching friends:", error);
            throw error;
        }
    }
}

export default FriendService;

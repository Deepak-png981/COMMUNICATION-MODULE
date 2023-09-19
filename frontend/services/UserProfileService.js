import UserProfileApi from "../apis/userProfileApis.js"

class UserProfileService {
  constructor() {
    this.api = new UserProfileApi();
  }

  async getProfile() {
    return this.api.getProfile();
  }

  async updateProfile(newData) {
    return this.api.updateProfile(newData);
  }
}

export default UserProfileService;

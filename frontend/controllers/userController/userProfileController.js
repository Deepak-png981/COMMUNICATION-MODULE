import UserProfileService from '../../services/UserProfileService.js';

class UserProfileController {
    constructor() {
        this.service = new UserProfileService();
        this.state = {
            name: '',
            email: '',
            mobile: '',
            activeHours: '',
            lastActive: '',
            bio: '',
            isEditing: false
        };
        this.mainContainer = document.createElement('div');
        this.mainContainer.id = 'UserProfileControllerContainer';
       
    }

    createInfoElement(label, value, isEditable = false) {
        const div = document.createElement('div');
        const infoLabel = document.createElement('span');
        infoLabel.textContent = label + ': ';
        div.appendChild(infoLabel);

        if (this.state.isEditing && isEditable) {
            const input = document.createElement('input');
            input.value = value;
            input.addEventListener('input', (e) => {
                this.state[label.toLowerCase()] = e.target.value;
            });
            div.appendChild(input);
        } else {
            const infoValue = document.createElement('span');
            infoValue.textContent = value;
            div.appendChild(infoValue);
        }

        return div;
    }

    makeFieldsEditable() {
        this.state.isEditing = true;
        this.displayProfile();
    }

    async updateProfile() {
        const updatedData = await this.service.updateProfile(this.state);
        Object.assign(this.state, updatedData);
        this.state.isEditing = false;
        this.displayProfile();
    }

    async renderProfile() {
        const profileData = await this.service.getProfile();
        Object.assign(this.state, profileData);

        const container = document.createElement('div');
        container.classList.add('profile-content');

        const elements = [
            ['Name', profileData.name, true],
            ['Email', profileData.email, true],
            ['Mobile', profileData.mobile, true],
            ['Active Hours', profileData.activeHours, true],
            ['Last Active', profileData.lastActive],
            ['Bio', profileData.bio, true]
        ].map(([label, value, isEditable]) => this.createInfoElement(label, value, isEditable));

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', this.makeFieldsEditable.bind(this));

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.addEventListener('click', this.updateProfile.bind(this));

        container.append(...elements, editButton, updateButton);

        return container;
    }

    async displayProfile() {
        const newContent = await this.renderProfile();
        this.mainContainer.innerHTML = '';
        this.mainContainer.appendChild(newContent);
        this.updateDOM();
    }

    updateDOM() {
        const existingContainer = document.getElementById('UserProfileControllerContainer');
        if (existingContainer) {
            existingContainer.replaceWith(this.mainContainer);
        } else {
            document.body.appendChild(this.mainContainer);
        }
    }

    async getProfileContainer() {
        const newContent = await this.renderProfile();
        this.mainContainer.innerHTML = '';
        this.mainContainer.appendChild(newContent);
        return this.mainContainer;
    }
}

export default UserProfileController;

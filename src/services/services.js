export default class Services {
    _apiBase = 'https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json';
    counter = 0;

    async getResource() {
        const res = await fetch(`${this._apiBase}`);

        if(!res.ok) {
            throw new Error(`could not fetch ${this._apiBase}, ${res.status}`)
        }
        return await res.json();
    }

    async getData () {
        const res = await this.getResource();
        return res.map(this.transformData)
    }

    transformData = (data) => {
        return {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            adress: data.adress,
            key: this.counter++,
            description: data.description
        }
    }
}
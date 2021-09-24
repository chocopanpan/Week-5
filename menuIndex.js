class Country {
    constructor(name) {
        this.name = name;
    }

    describe() {
        return `${this.name} is a country.`;
    }
}

class Continent {
    constructor(name) {
        this.name = name;
        this.countries = [];
    }

    addCountry(country) {
        if (country instanceof Country) {
            this.countries.push(country);
        } else {
            throw new Error (`Must enter valid country name.  ${country} is not a valid name.`);
        }
 
    }

    describe() {
            return `This ${this.name} consists of ${this.countries.length}.`;
        }
}

class Menu {
    constructor() {
        this.continents = [];
        this.selectedContinent = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createContinent();
                    break;
                case '2':
                    this.viewContinent();
                    break;
                case '3':
                    this.deleteContinent();
                    break;
                case '4':
                    this.displayContinents();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Thank You For Stopping By!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) Exit
        1) Create Continent
        2) View Continent
        3) Delete Continent
        4) Display All Continents`);
    }

    showContinentMenuOptions(ContinentInfo) {
        return prompt(`
        0) Back
        1) Add Country
        2) Remove Country
        ~~~~~~~~~~~~~~~~~~~~~~~
        ${ContinentInfo}`);
    }

    displayContinents() {
        let continentString = '';
        for (let i = 0; i < this.continents.length; i++) {
            continentString += i + ') ' + this.continents[i].name + '\n';
        }
        alert(continentString);
    }

    createContinent() {
        let name = prompt('Please enter continent name:');
        this.continents.push(new Continent(name));
    }

    viewContinent() {
        let index = prompt('Please enter the index of the continent you wish to view:');
        if (index > -1 && index < this.continents.length) {
            this.selectedContinent = this.continents[index];
            let description = 'Continent: ' + this.selectedContinent.name + '\n';

            for (let i = 0; i < this.selectedContinent.countries.length; i++) {
                description += i + ') ' + this.selectedContinent.countries[i].name + '\n';
            }

            let selection = this.showContinentMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createCountry();
                    break;
                case '2':
                    this.deleteCountry();
                
            }
        }

    }

    deleteContinent() {
        let index = prompt('Please enter the index of the continent you wish to delete:');
        if (index > -1 && index < this.continents.length) {
            this.continents.splice(index, 1);
        }
    }

    createCountry() {
        let name = prompt('Please enter country name:');
        this.selectedContinent.countries.push(new Country(name));
    }

    deleteCountry() {
        let index = prompt('Please enter the index of the country you wish to delete:');
        if (index > -1 && index < this.selectedContinent.countries.length) {
            this.selectedContinent.countries.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();
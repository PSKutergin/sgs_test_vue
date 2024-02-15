import { defineStore } from 'pinia'
import { URL_API } from '../../config'
import { getData } from '../../functions'

export const useSelectsStore = defineStore('selects', {
    state: () => ({
        selects: []
    }),

    getters: {
        getSelects(state) {
            return state.selects
        }
    },

    actions: {
        addSelect(select) {
            this.selects.push(select)
        },

        async createSelects() {
            this.selects = []

            await this.getEmployees()
            await this.getTeams()
            await this.getShifts()
        },

        async getEmployees() {
            const employees = await getData(`${URL_API}/employees`)
            this.addSelect({
                id: 0,
                name: 'cities',
                items: this.createCitiesList(employees),
                text: 'город'
            })
            this.addSelect({
                id: 1,
                name: 'workshops',
                items: this.createWorkshopsList(employees),
                text: 'цех'
            })
            this.addSelect({
                id: 2,
                name: 'employees',
                items: this.createEmployeesList(employees),
                text: 'сотрудника'
            })
        },

        async getTeams() {
            const teams = await getData(`${URL_API}/teams`)
            this.addSelect({
                id: 3,
                name: 'teams',
                items: teams,
                text: 'бригаду'
            })
        },

        async getShifts() {
            const shifts = await getData(`${URL_API}/shifts`)
            this.addSelect({
                id: 4,
                name: 'shifts',
                items: shifts,
                text: 'смену'
            })
        },

        createCitiesList(list) {
            return list.map((city) => {
                return {
                    id: city.id,
                    name: city.name,
                    selected: false
                }
            })
        },

        createWorkshopsList(list) {
            return list.flatMap(city =>
                city.workshops.map(item => ({
                    id: item.id,
                    name: item.name,
                    cityId: city.id,
                    selected: false
                }))
            )
        },

        createEmployeesList(list) {
            return list.flatMap(city =>
                city.workshops.flatMap(item =>
                    item.employees.map(empl => ({
                        id: empl.id,
                        name: empl.name,
                        workshopId: item.id,
                        cityId: city.id,
                        selected: false
                    }))
                )
            )
        }

    }
})
import { getIpAddressInfo } from './api'
import { IpInfo } from './api/getIpAddressInfo'

import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import markerIcon from './assets/marker-icon-2x.svg'

import test from './assets/icon-arrow.svg'
import './styles/index.scss'

console.log(test, markerIcon)

let map: L.Map

const submitButton = document.querySelector(
    '#submitButton'
) as HTMLButtonElement

const ipInput = document.querySelector('#ipInput') as HTMLInputElement

const ipAddressInfoHeading = document.querySelector(
    '#ipAddressInfo'
) as HTMLHeadingElement

const locationInfoHeading = document.querySelector(
    '#locationInfo'
) as HTMLHeadingElement

const timezoneInfoHeading = document.querySelector(
    '#timezoneInfo'
) as HTMLHeadingElement

const ispInfoHeading = document.querySelector('#ispInfo') as HTMLHeadingElement

submitButton.addEventListener('click', async (event) => {
    event.preventDefault()

    submitButton.disabled = true
    ipInput.disabled = true

    const data: IpInfo | undefined = await getIpAddressInfo(ipInput.value)

    if (data) {
        ipAddressInfoHeading.innerText = data.ip ? data.ip : '-'
        locationInfoHeading.innerText =
            data.location.country && data.location.region
                ? `${data.location.country} ${data.location.region}`
                : '-'
        timezoneInfoHeading.innerText = data.location.timezone
            ? data.location.timezone
            : '-'
        ispInfoHeading.innerText = data.isp ? data.isp : '-'

        createMap(data.location.lng, data.location.lat)
    }

    submitButton.disabled = false
    ipInput.disabled = false
})

function createMap(long: number, lat: number) {
    const mapElement = document.querySelector('#map') as HTMLElement

    if (map) {
        map.remove()
    }
    map = L.map(mapElement).setView([lat, long], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map)

    const customIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [22, 28],
    })

    L.marker([lat, long], {
        icon: customIcon,
    }).addTo(map)
}

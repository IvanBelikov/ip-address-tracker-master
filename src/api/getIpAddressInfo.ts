import { AxiosResponse } from 'axios'
import { ipApi } from './IpApi'
import { getIpAddressInfoEndpoint } from './endpoints'

export interface IpInfo {
    ip: string
    isp: string
    location: {
        country: string
        region: string
        timezone: string
        lat: number
        lng: number
    }
}

export const getIpAddressInfo = async (
    ipAddress: string
): Promise<IpInfo | undefined> => {
    const endpoint = getIpAddressInfoEndpoint()

    try {
        const response: AxiosResponse<IpInfo> = await ipApi.get(endpoint, {
            params: {
                apiKey: process.env.IP_API_TOKEN,
                ipAddress,
            },
        })

        return response.data
    } catch (e) {
        console.error(e)
    }
}

import axios from "axios";

const apiKey = "pk_live_e1d4af8e97c7515606540d088dd33b84";


export async function getNonProfits(causes : string) {
    return axios.get("https://partners.every.org/v0.2/browse/" + causes + "?apiKey=" + apiKey).then((response) => {
        return (response.data.nonprofits);
    });

    
}


export async function getNonProfit(ein: string) {
    return axios.get("https://partners.every.org/v0.2/nonprofit/" + ein + "?apiKey=" + apiKey).then((response) => {
        return (response.data.data);
    });
}
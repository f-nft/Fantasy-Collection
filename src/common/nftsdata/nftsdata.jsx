import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://api.nftport.xyz/v0/nfts/0x014e897defaf2adb41c117d853aafb8729b78b44',
  params: {chain: 'polygon', include: 'metadata'},
  headers: {
    'Content-Type': 'application/json',
    Authorization: '0b4d39b3-8ce8-43b6-99f0-427226147a55'
  }
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});

export function nftData() {
    
}
import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { use } from 'react'
import { CoinContext } from '../../context/context'
import LineChart from '../../components/LIneChart/LineChart'

const Coin = () => {
  const {coinId}=useParams();
  const [coindata,setCoinData]=useState();
  const [historicaldata,setHistoricalData]=useState();
  const{currency}=useContext(CoinContext)


  const fetchCoinData=()=>{
    const options = {method: 'GET', headers: { Accept:'application/json','x-cg-demo-api-key':'CG-8A1zpQwK9kJtbCPAiikgSACX'}};

fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
  .then(res => res.json())
  .then(res => setCoinData(res))
  .catch(err => console.error(err));
  }


  const fetchHistoricalData= async()=>{
    const options = {method: 'GET', headers: {Accept:'application/json','x-cg-demo-api-key':'CG-8A1zpQwK9kJtbCPAiikgSACX'}};

fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
  .then(res => res.json())
  .then(res => setHistoricalData(res))
  .catch(err => console.error(err));
  }

  useEffect(()=>{
    fetchCoinData()
    fetchHistoricalData()
  },[currency])


  if(coindata && historicaldata){
  return (
    <div className='coin'>
      <div className="coin-name">
      <img src={coindata.image.large} alt="" />
      <p><b>{coindata.name} ({coindata.symbol.toUpperCase()})</b></p>
      </div>
      <div className="coin-chart">
        <LineChart historicaldata={historicaldata}/>
      </div>
      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coindata.market_cap_rank}</li>
        </ul>

        <ul>
          <li>Current Price</li>
          <li>{currency.symbol} {coindata.market_data.current_price[currency.name].toLocaleString()}</li>
        </ul>

        <ul>
          <li>Market_Cap</li>
          <li>{currency.symbol} {coindata.market_data.market_cap[currency.name].toLocaleString()}</li>
        </ul>

        <ul>
          <li>24 Hour High</li>
          <li>{currency.symbol} {coindata.market_data.high_24h[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour Low</li>
          <li>{currency.symbol} {coindata.market_data.low_24h[currency.name].toLocaleString()}</li>
        </ul>



      </div>
    </div>
  )
}
else{
  return(
    <div className="spinner">
      <div className="spin"></div>
    </div>
  )
}
}

export default Coin

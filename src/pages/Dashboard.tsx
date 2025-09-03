import Clock from '../components/Clock'
import WeatherWidget from '@/components/weather_widget';
import WeatherForecast from '@/components/weather-forecast';



export default function Dashboard(){
  return (
    <div className="content">

      {/* <SunClockWidget /> */}

      <div className='grid'>

        <Clock />
        <WeatherWidget city="Warszawa" apiKey="af8b3311443695ee4563e7d85bec9253" />
     

      </div> 

             
                
                  
                

                    
                
                  <WeatherForecast city="Warszawa" apiKey="af8b3311443695ee4563e7d85bec9253" />
                
                

      {/* <SunClockWidget />
      <WeatherWidget city="Warszawa" apiKey="af8b3311443695ee4563e7d85bec9253" />
      <WeatherForecast city="Warszawa" apiKey="af8b3311443695ee4563e7d85bec9253" />
    
     */}
      
                  
               
    
    
    </div>
  )
}

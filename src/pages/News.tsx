
import WarNewsWidget from '@/components/war-news-widget';
import RSSNewsWidget from '@/components/rss-news-widget';

export default function News(){
  return (




    // <div className=" auto-rows-min gap-4 md:grid-cols-1">
    //   <div className="border rounded-xl p-4 bg-white dark:bg-neutral-900 shadow">
    //       <RSSNewsWidget feedUrl="https://wiadomosci.wp.pl/rss.xml" />
    //   </div>
              
    //   <div className="border rounded-xl p-4 bg-white dark:bg-neutral-900 shadow">
    //     <WarNewsWidget />
    //   </div>
    // </div>


    <div className="content">
      <div className="card">
          <RSSNewsWidget feedUrl="https://wiadomosci.wp.pl/rss.xml" />
      </div>
              
      <div className="card">
        <WarNewsWidget />
      </div>
    </div>




  )
}

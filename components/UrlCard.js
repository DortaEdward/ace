import { useState } from 'react'
import styles from '../styles/UrlCard.module.css';

function UrlCard({url}) {
  const [toggle,setToggle] = useState(false);

  const copyUrl = async () => {
    setToggle(true);
    await navigator.clipboard.writeText(url.originalUrl);
    setTimeout(()=>{
      setToggle(false);
    },500);
  }

  return (
    <div key={url.originalUrl} className={styles.urlCard}>
      <div className={styles.urlContent}>
        <p className={styles.originalUrlText}>{url.originalUrl}</p>
        <p className={styles.shortenUrlText}>{url.shorten}</p>
      </div>
      <div className={styles.copyBtn}>
        <svg viewBox="0 0 24 24"
          onClick={() => copyUrl()}
          className={toggle ? styles.active : ''}
          ><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
        <p className={toggle ? styles.active : styles.inactive}>
          Copied
        </p>
      </div>
    </div>
  )
}

export default UrlCard
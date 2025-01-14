import styles from './Menu.module.css';
import global from '../../pages/App.module.css';
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Link from 'next/link';

const Menu = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const getOptions = async () => {
      const cats = await (await fetch(`/api/categories.json`)).json()
      const years = await (await fetch(`/api/dates/years.json`)).json()

      setCategories(cats);
      setYears(years);
    }

    getOptions();
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.menu}>
      <div className={`${global.wrapper} ${styles.wrapper}`}>
        <Header isInverted onClose={onClose} className={styles.header} />
        <div className={styles.bio}>
          <p>Started in April 2010 by a group of young, good looking, modest kids.</p>
          <p>Introduced new artists, experimented with writing, and organised events both sides of the Atlantic.</p>
          <p>Won Site of the Year in 2012.</p>
          <p>Quietened down 2017 - 2019.</p>
        </div>
        <div className={styles.years}>
          {years.map(year => (
            <li key={year} className={styles.item}>
              <Link as={`/archive/${year}`} href="/archive/[year]" className={styles.link}>
                {year}
              </Link>
            </li>
          ))}
        </div>
        <div className={styles.categoriesBox}>
          <div className={styles.categories}>
            {categories.map(cat => (
              <li className={styles.item} key={cat.slug}>
                <Link as={`/${cat.slug}`} href="/[category]" className={styles.link}>
                  {cat.name}
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
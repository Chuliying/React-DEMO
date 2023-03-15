import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import data from "./data.json"
import styles from './styles/About.module.scss'

interface AboutData {
    img: string,
    name: string,
    en: string,
    tw: string
}

const aboutData: AboutData[] = data.about;
const About = () => {
    const { locale } = useRouter();
    return (
        <div className={styles.about}>
            <h1 className="text-center text-2xl my-10">About Us</h1>
            <h4 className="text-center my-8 text-l">
                {locale === 'en' ? 'Organizer' : "主辦單位"}
            </h4>
            <div className={`${styles.container, styles.main} p-10 lg:flex mx-auto main bg-white mb-20`}>
                <div className={`${styles.logo__container} mx-auto`}>
                    <Image className="logo" src={require('../public/images/logo/demo.png')} alt="studio76" />
                </div>
                <div className="flex-1">
                    <p>
                        {locale === "en" ? 'description' : ' 描述'}
                    </p>
                </div>
            </div>
            <h4 className="text-center mt-8 text-l">
                {locale === 'en' ? 'Co-Organizer' : "協辦單位"}
            </h4>
            <p className="text-center text-sm text-gray">
                {locale === 'en' ? 'order by alphabetical' : "依字首排序"}
            </p>
            <div className={`container mb-10 py-5 mx-auto ${styles.waterfall}`}>
                {
                    aboutData.map((about, index) => (
                        <div key={index} className=" bg-white p-10 mb-4 ">
                            <Image className={styles.logo__container} src={about.img} height={150} width={150} alt={about.name} />
                            <p> {locale === "en" ? about.en : about.tw}</p>
                        </div>))
                }
            </div>
        </div >
    );
};

export default About;

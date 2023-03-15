import React, { useRef } from 'react'
import { useRouter } from "next/router";
import Image from 'next/image';
import data from "./data.json"
import styles from './styles/Activites.module.scss'

interface Member {
    name: string,
    engName: string,
    des: string,
    engDes: string,
    imageUrl: string
}

const member: Member[] = data.activities;

const Activities = () => {
    // 設定錨點
    const introRef = useRef<HTMLDivElement>(null);
    const memberRef = useRef<HTMLDivElement>(null);
    const { locale } = useRouter();

    // 視窗滾動到錨點
    const scrollToEvent = (tar: React.RefObject<HTMLDivElement>): void => {
        if (tar.current !== null) {
            var headerOffset = 125;
            var elementPosition = tar.current.getBoundingClientRect().top;
            var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    }

    return (
        <div className={styles.activities}>
            <h1 className='lg:text-2xl text-xl text-center mx-auto lg:my-10 my-10'>
                {locale === 'en' ? 'Title' : "標題"}
            </h1>
            <ul className={styles.navi}>
                <li onClick={() => scrollToEvent(introRef)}>
                    {locale === 'en' ? 'activities' : "活動"}
                </li>
                <li onClick={() => scrollToEvent(memberRef)}>
                    {locale === 'en' ? 'member' : "團隊"}
                </li>
            </ul>
            <div className='container bg-white xl:p-12 pt-8 p-6 mx-auto lg:mb-8 mb-4' ref={introRef}>
                <h2 className='text-center text-xl lg:mb-8 title'>
                    {locale === 'en' ? 'Introduction' : "活動介紹"}
                </h2>
                <div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquam, enim ut commodo aliquam, libero diam vulputate justo, non maximus lorem elit accumsan tortor. Cras euismod odio vitae ipsum pulvinar elementum. Maecenas scelerisque arcu lorem, egestas sodales tortor aliquam elementum. Duis pellentesque aliquam velit ut placerat. Phasellus eu aliquam risus. Pellentesque aliquet mi lacus, a vehicula nisl auctor in. Praesent maximus blandit posuere. Fusce nisl velit, luctus vitae diam eget, malesuada ultrices nunc. Vivamus placerat in leo id commodo. Quisque tincidunt sed lorem non suscipit. Nulla posuere ligula neque, sed finibus sapien feugiat vitae. Duis tempus euismod tellus eu congue. Nam vestibulum tortor vitae turpis blandit, non fringilla turpis finibus. Nulla in semper lacus. Sed nibh leo, viverra et sem eu, accumsan auctor neque.
                    </p>
                </div>
            </div>
            <div className=' mx-auto max-w-7xl  xl:p-12 p-4' ref={memberRef}>
                <h2 className='text-center text-xl mb-8 title'>
                    {locale === 'en' ? 'member' : "團隊"}
                </h2>
                <div>
                    <div className='grid xl:grid-cols-3 xl:gap-10 p-4'>
                        {(
                            member.map((member, index) =>
                                <div className='text-center mb-6' key={index}>
                                    <Image className='rounded-full max-w-xs w-full mx-auto mb-6' src={member.imageUrl} width={100} height={100} alt={locale === 'zh-TW' ? member.name : member.engName} />
                                    <h5 className='text-center text-md mb-2'>{locale === 'zh-TW' ? member.name : member.engName}</h5>
                                    <p className='text-left text-gray-700 text-sm'>
                                        {locale === 'zh-TW' ? member.des : member.engDes}
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Activities
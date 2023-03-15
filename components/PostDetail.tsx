import moment from 'moment'
import React, { ReactNode } from 'react'

interface Children {
  text: string,
  type: string,
  href?: string,
  openInNewTab?: string,
  [propName: string]: any;
}

type Content = {
  text: string,
  type: string,
  children: Children,
}


const PostDetail = ({ post }) => {
  // 轉換 data to jsx
  const getContentFragment = (index: number, text: any, obj: Children, type: string) => {
    let modifiedText = text;

    // 檢查行內種類
    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
      if (obj.href) {
        // 因為noreferrer屬性是判斷的，新增除外原則防止錯誤
        // eslint-disable-next-line react/jsx-no-target-blank
        modifiedText = (<a href={obj.href}
          target={obj.openInNewTab ? "_blank" : ''}
          rel={obj.openInNewTab ? "noreferrer" : 'noopener'}
          key={index}>
          {obj.children[0].text}
        </a>)
      }
    }

    // 檢查 tag
    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-xl font-bold mb-4">{modifiedText.map((item: ReactNode, i: number) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="py-2">{modifiedText.map((item: ReactNode, i: number) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-lg font-bold py-2 mt-4 mb-2">{modifiedText.map((item: ReactNode, i: number) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'image':
        return (
          <figure key={index} className='-mx-4 my-2'>
            <img
              alt={obj.title}
              height={obj.height}
              width={obj.width}
              src={obj.src}
            />
          </figure>
        );
      case 'link':
        return <a key={index} rel="noreferrer" href={obj.href} target='_blank'><p>link</p></a>
      default:
        return modifiedText;
    }
  };
  return (
    <div className='bg-white shadow-lg lg:p-8 xl:pb-12 pb-4 xl:mb-8 max-w-4xl mx-auto main-post'>
      <div className='realtive overflow-hidden shadow-md mb-6'>
        {/* cover photo */}
        <img src={post.featureImage.url} alt={post.localizations[0].title} className="object-top h-full w-full " />
      </div>
      <div className='px-4 lg:px-0'>
        <div className='flex items-center xl:mb-8 mb-4 w-full'>
          {/* created time */}
          <div className='font-medium text-grey-700'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-grey-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className='text-sm'>
              {moment(post.createdAt).format("YYYY-MM-DD")}
            </span>
          </div>
        </div>
        {/* main post */}
        <h1 className='xl:mb-8 mb-4 text-xl lg:text-3xl font-semibold'>
          {/* post title */}
          {post.localizations[0].title}
        </h1>
        <hr className='mb-4' />
        {/* post content */}
        {/* get post by localization */}
        {post.localizations[0].content.raw.children.map((typeObj: Content, index: number) => {

          // 遞迴data
          const children = typeObj.children.map((item: Children, itemIndex: number) => getContentFragment(itemIndex, item.text, item, '',))

          return getContentFragment(index, children, typeObj, typeObj.type)
        })}
        <hr className='my-4 border-t' />
      </div>
    </div>
  )
}

export default PostDetail
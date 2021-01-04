import alanBtn from '@alan-ai/alan-sdk-web';

import { useEffect, useState, useCallback } from 'react';

function useAlan(history, blogArray) {

    const [alanInstance, setAlanInstance] = useState();
    const COMMANDS = {
        MOVE_TO: "move-to",
        OPEN_BLOG: "open-blog"
    }

    const moveTo = useCallback(({ detail: { pageName }}) =>{
        switch (pageName) {
            case "home": {
                alanInstance.playText("Moving to home page")        
                history.push('/')
                break;
            }
            case "about": {
                alanInstance.playText("Moving to about page");
                history.push('/about')
                break;
            }
            case "blogs":{
                alanInstance.playText("Moving to blogs page")
                history.push('/blogs')
                break;
            }
            default:
                break;
        }
        // eslint-disable-next-line
    }, [alanInstance])

    const openBlog = useCallback(({ detail: { ordinalBlog, ordinalString }}) => {
        console.log("so blog hien tai", blogArray.length)
        if(blogArray.length === 0) {
            alanInstance.playText("There is no blog. You have to go to the blogs page so that i can have the blogs")
        } else {
            if(ordinalBlog > blogArray.length){
                alanInstance.playText("Can not open that blog")
            } else {
                alanInstance.playText(`opening the ${ordinalString} blog`);
                history.push(`/blog/${blogArray[ordinalBlog - 1].slug.current}`, { replace: true });
            }
        }
        // eslint-disable-next-line
    }, [alanInstance, blogArray])

    useEffect(() => {
        window.addEventListener(COMMANDS.MOVE_TO, moveTo)
        window.addEventListener(COMMANDS.OPEN_BLOG, openBlog)
        return () => {
            window.removeEventListener(COMMANDS.MOVE_TO, moveTo)
            window.removeEventListener(COMMANDS.OPEN_BLOG, openBlog)
        }
    // eslint-disable-next-line
    }, [alanInstance, moveTo, openBlog])
    
    // eslint-disable-next-line
    useEffect(() => {
        if(alanInstance) return;
        setAlanInstance(
            alanBtn({
                bottom: '15px',
                left: '15px',
                key: process.env.REACT_APP_ALAN_KEY,
                onCommand: ({ command, payload }) => {
                    window.dispatchEvent(new CustomEvent(command, { detail: payload }))
                },
            })
        )
        // eslint-disable-next-line
    }, []);
    return null;
}

export default useAlan;

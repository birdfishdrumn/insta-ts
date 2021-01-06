import React  from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import {useSelector} from "react-redux";
import {getLoadingState, getLoadingText} from "../../reducks/loadingSlice";

interface CHILDREN {
  children?: any
}

const Loading: React.FC<CHILDREN> = ({children}) => {

    const isBeingLoaded = useSelector(getLoadingState);
    const loadingText  = useSelector(getLoadingText)

    return (
        <>
            {(isBeingLoaded) && (
                <section className="c-section__loading">
                    <CircularProgress/>
                    <p>{loadingText}</p>
                </section>
            )}
            {children}
        </>
    );
};

export default Loading

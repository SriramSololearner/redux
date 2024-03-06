export const StyleSheet = {
    Card: {
        padding: '5px',
        borderRadius: '8px',
        height: '100%',
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        boxShadow: '0px 0px 2px 0px grey',
        '&:hover': {
            boxShadow: '0px 0px 10px 0px grey',
        }

    },
    Header: {
        width: "98.75%",
        height: '10vh',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: "sticky",
        top: "0px",
        mb: '20px',
        background: '#3774f0',
        color: 'white',
        pl: '20px',
        zIndex: '5',
        '&:hover': {
            boxShadow: '0px 0px 20px 1px #3774f0',
            transition: "0.8s ease-out",

        }
    },
    flipkartIcon: {
        width: "85px",
    },


    exploreTxt: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '12px',
        fontStyle: 'italic',
        mt: "-15px"
    },
    Plus: {
        color: '#f3d318',
        ml: '2px'
    },
    flower: {
        width: '15px', height: '15px',
        ml: '2px'
    },
    Cart: {
        display: 'flex', alignItems: 'center',
        '&:hover': {
            opacity: '0.8  ',
            cursor: 'pointer'
        }
    },


    btnGrp: {
        mt: '20px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        '&:hover': {
            // bgcolor: '#578cc9',
        }
    },

    Headerbtn: {
        bgcolor: "white",
        mr: '10px', color: 'blue',
        fontWeight: 'bold',
        '&:hover': {
            boxShadow: '0px 0px 1px 1px white',
            color: 'white',
            transition: '0.8s ease-in-out'


        }
    },

    button: {
        '&:hover': {
            bgcolor: '#578cc9',
            color: 'white'
        }
    },


}
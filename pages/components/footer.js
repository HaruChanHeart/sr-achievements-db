const Footer = () => {
    return (
        <footer className='text-center my-10 text-slate-600 dark:text-white'>
            <h4 className='text-xl font-black'>스타레일 업적 사전 <sup>v0.4.0</sup></h4>
            <p>&copy;{new Date().getFullYear()} 냉혈적인 하루</p>
        </footer>
    )
}

export default Footer
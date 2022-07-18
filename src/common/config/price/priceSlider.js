<Row style={{ marginTop: "2em" }}>
    <Col sm={6} style={{ textAlign: "left" }}>
        <h1 style={{ fontWeight: "bold" }}>Rarity</h1>
        <p style={{ marginTop: "40px", fontSize: "18px", fontWeight: "bold" }}>
            Rarity is a decentralized platform that allows you to create your own unique collectible <br />
            and sell it to other users.<br />
            Each collectible is unique and can be sold to anyone for a price.<br />
            You can also buy collectibles from other users.<br />
        </p>
        {/* create a list of 5 buttons */}
        <ul style={{ marginTop: "2em" }}>
            <li>
                <Button className="custombutton" style={{
                    marginTop: "1em", width: "10em", fontSize: "18px", border: "0.2px",
                    borderRadius: "15px", fontFamily: "Rambla", backgroundColor: "#e50303", opacity: "34%", height: "46px"
                }}>
                    <a href="/" style={{ textDecoration: "none", color: "white" }}>
                        INITIALIZATION 🚼
                    </a>
                </Button>
            </li>
            <li>
                <Button style={{
                    marginTop: "1em", width: "10em", fontSize: "18px", border: "0.2px",
                    borderRadius: "15px", fontFamily: "Rambla", backgroundColor: "#e50303", opacity: "45%", height: "46px"
                }}>
                    <a href="/" style={{ textDecoration: "none", color: "white" }}>
                        RECLAMATION ♻️
                    </a>
                </Button>
            </li>
            <li>
                <Button style={{
                    marginTop: "1em", width: "10em", fontSize: "18px", border: "0.2px",
                    borderRadius: "15px", fontFamily: "Rambla", backgroundColor: "#e50303", opacity: "55%", height: "46px"
                }}>
                    <a href="/" style={{ textDecoration: "none", color: "white" }}>
                        DISCOVER 🚀
                    </a>
                </Button>
            </li>
            <li>
                <Button style={{
                    marginTop: "1em", width: "10em", fontSize: "18px", border: "0.2px",
                    borderRadius: "15px", fontFamily: "Rambla", backgroundColor: "#e50303", opacity: "64%", height: "46px"
                }}>
                    <a href="/" style={{ textDecoration: "none", color: "white" }}>
                        ANGEL & DEVIL ☯️
                    </a>
                </Button>
            </li>
            <li>
                <Button style={{
                    marginTop: "1em", width: "10em", fontSize: "18px", border: "0.2px",
                    borderRadius: "15px", fontFamily: "Rambla", backgroundColor: "#e50303", height: "46px"
                }}>
                    <a href="/" style={{ textDecoration: "none", color: "white" }}>
                        CHAOS 🔞
                    </a>
                </Button>
            </li>
        </ul>

    </Col>
    <Col sm={6}>
        <img src={Commonimg} alt="about4" style={{ width: "100%" }} />
    </Col>
</Row>
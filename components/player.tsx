import { useMediaPlayer, MediaPlayer } from "../data/content";
import { useState, useEffect, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";

import { Playlist } from "./playlist";
import { WavyZorb } from "./zorb";
import { Row, Col } from "./layout";
import { ContentPlayer } from "./contentPlayer";
import { Loading } from "./loading";
import * as themes from "./themes";

export const Player = () => {
  const mediaPlayer = useMediaPlayer();
  const [theme, setTheme] = useState<themes.theme>(themes.colorWay);
  if (mediaPlayer.currentTrack === undefined) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <Flex>
        <Header>
          <Title>~ 🎵🌞🎵 ~</Title>
        </Header>
        <MainContainer>
          <ContentContainer size={3}>
            <ContentPlayer player={mediaPlayer} />
          </ContentContainer>
          <Description size={1}>
            <h3>
              <i>"{mediaPlayer.currentTrack?.metadata.description}"</i>
            </h3>
            <CreatorText>
              - {mediaPlayer.currentTrack?.creator.id || "loading.."}
            </CreatorText>
          </Description>
          <SongPane size={1}>
            <h3 style={{ margin: "5px"}}>Up Next</h3>
            <Playlist player={mediaPlayer} />
          </SongPane>
        </MainContainer>
        <Footer>
          <div>
            <a href="https://github.com/erikreppel/zora.fm">src</a> |{" "}
            <a href="https://twitter.com/programmer">@programmer</a>
          </div>
          <div style={{ padding: "3px" }}>
            <themes.ThemeButton
              theme={themes.colorWay}
              onClick={() => setTheme(themes.colorWay)}
            />
            <themes.ThemeButton
              theme={themes.night}
              onClick={() => setTheme(themes.night)}
            />
            <themes.ThemeButton
              theme={themes.light}
              onClick={() => setTheme(themes.light)}
            />
          </div>
        </Footer>
      </Flex>
    </ThemeProvider>
  );
};

const SongPane = styled.aside`
  flex: ${(props) => props.size};
  background: ${(props) => props.theme.songPane};
  flex-direction: column;
`;

const ContentContainer = styled.div`
  flex: ${(props) => props.size};
  align-items: center;
  display: flex;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px; 
  background: ${(props) => props.theme.contentContainer};
`;
const Footer = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.footer};
  padding-top: 5px;
  padding-botton: 5px;
  padding-left: 10px;
  padding-right: 10px;

`;

const Title = styled.p`
  text-align: center;
  font-size: 24px;
`;

const Header = styled.div`
  display: flex;
  background: ${(props) => props.theme.header};
  justify-content: center;
`;

const Description = styled.div`
  flex: ${(props) => props.size};
  background: ${(props) => props.theme.description};
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  color: ${(props) => props.theme.textColor};
`;

const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;     // <- this
  justify-content: space-between;
  background: ${(props) => props.theme.contentContainer};
  flex-grow: 1;
`;

const CreatorText = styled.div`
  font-size: 12px;
`;

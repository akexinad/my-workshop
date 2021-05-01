import React, { FC } from 'react';
import { Header, Footer } from '../components';
import styled, { StyledComponent } from '@emotion/styled';
import { widths, unit } from '../styles';

/**
 * Layout renders the full page content:
 * with header, Page container and footer
 */

const Layout: FC<any> = ({ fullWidth, children, grid }) => {
  return (
    <>
      <Header />
      <PageContainer fullWidth={fullWidth} grid={grid}>
        {children}
      </PageContainer>
      <Footer />
    </>
  );
};

export default Layout;

/** Layout styled components */

//@ts-ignore
const PageContainer: StyledComponent<any, any, any> = styled.div((props) => ({
  display: 'flex',
  justifyContent: props.grid ? 'center' : 'top',
  flexDirection: props.grid ? 'row' : 'column',
  flexWrap: 'wrap',
  alignSelf: 'center',
  flexGrow: 1,
  maxWidth: props.fullWidth ? null : `${widths.regularPageWidth}px`,
  width: '100%',
  padding: props.fullWidth ? 0 : unit * 2,
  paddingBottom: unit * 5,
}));
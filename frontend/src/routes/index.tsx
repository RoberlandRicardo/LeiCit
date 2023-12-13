
import { useEffect, useRef } from 'react';
import PublicRoutes from './PublicRoutes';
import Web3 from 'web3';
import useRoutesViewModel from './view.model';
import PrivateRoutes from './PrivateRoutes';

function Routes() {

    const {accounts} = useRoutesViewModel({});

    if (accounts.length > 0)
        return (
            <PrivateRoutes />
        )

    return (
        <PublicRoutes />
    )
}

export default Routes;
# Link In Bio creator

Create a link in bio page for your social media accounts. Add to IPFS in Brave Browser

## Project management
Planning is currently done in [this hackmd](https://hackmd.io/NFIiF0KuTeCKtRvAj23Rhw), it will soon be moved into gh issues on this repo.

## Running
* `npm run build`
* open `about://extensions` and load unpacked extension

_you will need to have IPFS Desktop/Kubo running to publish to local node_

In order to publish to Kubo/IPFS Desktop, you will need to update your IPFS Config

``` JSON
{
"API": {
		"HTTPHeaders": {
			"Access-Control-Allow-Origin": [
				"chrome-extension://bjgalcncpnagkpfakcbleingnkcaebah"
            ]
        }
}
}
```

Built by Justice Engineering
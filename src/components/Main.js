import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h3>Add NFT</h3>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const image = this.productImage.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          this.props.createProduct(name, image, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="NFT Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productImage"
              type="text"
              ref={(input) => { this.productImage = input }}
              className="form-control"
              placeholder="NFT Image"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="NFT Price"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add NFT</button>
        </form>
        <p>&nbsp;</p>
        <h3>Buy NFT</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            {this.props.products.map((product, key) => {
              const image = product.image;
              return (
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>
                  <div><img id="dapp-image" src={`https://gateway.pinata.cloud/ipfs/${image}`} alt="" border="3" height="200" width="200"/></div>
                  </td>
                  <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                  <td>{product.owner}</td>
                  <td>
                    {!product.purchased
                      ? <button
                        name={product.id}
                        value={product.price}
                        onClick={(event) => {
                          this.props.purchaseProduct(event.target.name, event.target.value)
                        }}
                      >
                        Buy
                        </button>
                      : null
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;

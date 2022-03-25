// migration 파일들은 디플로이 할 때 실행되는 파일
// 1. 기존에 존재하는 initial_migration 파일의 내용을 붙여넣기.
// 2. Migration이라는 명칭을 모두 VendingMachine으로 수정.
// 3. 이 Migration 파일의 의미는 마이그레이션(=배포)을 실행할 때 'VendingMachine' contract를
//  포함시켜달라는 뜻
// 4. 특정 네트워크에 contract를 배포할 때 truffle migrate 명령어를 사용하여 배포하게 됨.
// 즉, 여기서 migration은 배포를 의미
const VendingMachine = artifacts.require("VendingMachine");

module.exports = function (deployer) {
  deployer.deploy(VendingMachine);
};

<template>
    <div class="editAddress">
        <HeaderTop :title="`添加地址`" :hasright="true" :rightText="`保存`" :routeFuc="()=>{}"></HeaderTop>
		<div class="edit-address">
			<div class="edit-address-list">
				<div class="list-left">收件人</div>
				<div class="list-right"><input type="text" placeholder="请选输入姓名"  :disabled="disabledFlag"></div>
			</div>
			<div class="edit-address-list">
				<div class="list-left">联系电话</div>
				<div class="list-right"><input type="text" placeholder="请输入手机号"  :disabled="disabledFlag"></div>
			</div>
			<div class="edit-address-list" @click="showAddressSelect">
				<div class="list-left">省/市/县</div>
				<div class="list-right">
					<div><input type="text" placeholder="请选择地址" :value="address" disabled="true"></div>
					<div><img src="../../assets/images/trans-back.png" alt=""></div>

				</div>
			</div>
			<div class="edit-address-list">
				<div class="list-left">详细地址</div>
				<div class="list-right"><input type="text" placeholder="请输入详细地址"  :disabled="disabledFlag"></div>
			</div>
			<div class="edit-address-list">
				<div class="list-left">邮政编码</div>
				<div class="list-right"><input type="text" placeholder="请输入邮政编码"  :disabled="disabledFlag"></div>
			</div>
		</div>
		<div class="add-switch">
			<div class="switch">设为默认值</div>
			<div>
				<mt-switch v-model="value"></mt-switch>
			</div>

		</div>
<!--         <div class="btn-chaxun">
                <MuSubmit :btnText="`删除地址`" :onclick="()=>{}" :disable="false" ></MuSubmit>
            </div> -->
            <div class="address-yar" v-if="addressFlag">
            	<div class="address-fix">
            		<div class="tip">
            			<div class="cancel"  @click="obtainAdd(false)">取消</div>
            			<div>编辑地址</div>
            			<div class="commit" @click="obtainAdd(true)">确定</div>
            		</div>
            	<mt-picker :slots="slots" :itemHeight='36' @change="onValuesChange"></mt-picker>
            </div>
            </div>

    </div>


</template>

<script>
import HeaderTop from '../../components/top/top';
import MuSubmit from '../../components/submit/muSubmit';
import addr from '../../assets/address.json'
export default {
    name:'goodsDetail',
    components:{
        HeaderTop,
        MuSubmit
    },
    data(){
        return{
          disabledFlag:false,
           slots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }, {
         flex: 1,
          values: [],
          className: 'slot2',
          textAlign: 'center'
        }, {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        }
      ],
      testV:'',
      testp:'',
      addressFlag:false,
      address:'',
      value:this.value
        }
    },
    mounted(){
      addr.map((v,k)=>{
        this.slots[0].values.push(v.name)
      })
      addr[0].cities.map((v,k)=>{
          this.slots[1].values.push(v.name)
      })
      addr[0].cities[0].counties.map((v,k)=>{
          this.slots[2].values.push(v.name)
      })
    	// this.showMessage(`888`,'mess',`pnode`,this.alert1)

  },
   computed: {
    totalAmount () {
      return  this.testV[1]
    }
  },
   watch: {
      totalAmount(newValue, oldValue) {
            this.testp.setSlotValue(2, this.testV[0])
      }
  },
    methods:{
    	obtainAdd(flag){
    		this.address="";
    		if(flag){
    		this.testV.map((v)=>{
    			this.address+=v;
    		})
    		}

    		this.addressFlag=false;
    	},
    	showAddressSelect(){
    		this.addressFlag=true;
    	},
	   onValuesChange(picker, values) {
        this.testV=values;
        this.testp=picker;
        picker.slots[0].values.map((v,k)=>{
            if(v==values[0]){
              this.slots[1].values=[]
              addr[k].cities.map((v1,k1)=>{
                  this.slots[1].values.push(v1.name)
                if(v1.name==values[1]){
                    this.slots[2].values=[]
                    addr[k].cities[k1].counties.map((v2,k2)=>{
                    this.slots[2].values.push(v2.name)
                  })
                 }
              })
            }
        })

    }
    }
}
</script>

<style lang="scss" scoped>
.add-switch{
	margin:.2rem 0 0 ;
	padding:0 .3rem;
	background:#fff;
	display:flex;
	justify-content: space-between;
	align-items:center;
	height:1rem;
	.switch{
		font-size:.3rem;
	}
}
.address-yar{
	width:100%;
	height:100;
	position:fixed;
	top:0;
	bottom:0;
	right:0;
	left:0;
	background:rgba(0,0,0,.5);
	.tip{
		display:flex;
		height:1rem;
		align-items:center;
		border-bottom:1px solid #ececec;
    background: #D6353F;
		div{
			flex:1;
			text-align:center;
			color:#3b556e;
			font-size:20px;
		}
		.commit{
			font-size:18px;
			color:#2756a4;
		}
		.cancel{
			font-size:18px;
			color:#c0c4c7;
		}
	}
}
.address-fix{
	position:fixed;
	bottom:0;
	width:80%;
	background:#fff;

}
.editAddress{
	width:100%;
	height:100%;
	background:#f7f8fa;
	.btn-chaxun{
		width:90%;
		margin:1rem auto 0;
	}
}
.edit-address{
	width:100%;
	margin:.2rem 0 0 ;
	.edit-address-list{
		display:flex;
		align-items:center;
		height:1rem;
		border-bottom:1px solid #ececec;
		background:#fff;
		padding:0 .3rem;
		.list-left{
			font-size:.3rem;
			color:#3b556e;
			flex:.4;
		}
		.list-right{
			font-size:.3rem;
			color:#3b556e;
			flex:1;
			display:flex;
			justify-content:space-between;
			align-items:center;
			div{
				color:#3b556e;
			}
			img{
				width:.12rem;
				height:.22rem;
			}
			input{
				border:0 none;
				width:100%;
				color:#3b556e;
			}
			input:disabled{
				background:#fff;
			}
		}
	}

}
</style>
